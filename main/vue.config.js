// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const PROJECT_NAME = process.env.VUE_APP_NAME;
const isDev = process.env.NODE_ENV === 'development';

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  publicPath: './',
  // 生产环境打包时不启用SourceMap
  productionSourceMap: false,
  // transpileDependencies: ["common"],
  // 开发阶段服务器配置
  devServer: {
    port: process.env.PORT ? +process.env.PORT : 80,
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'));
    config.plugin('html').tap(args => {
      args[0].title = PROJECT_NAME;
      return args;
    });
    // 从默认svg规则中排除src/icons路径，因为会当做图标自动加载
    config.module.rule('svg').exclude.add(resolve('src/icons'));
    // 添加svg-sprite-loader加载器
    config.module
      .rule('svg-sprite-loader')
      .test(/.svg$/)
      .include.add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end(); // 移除prefecth 提高首屏速度
    config.plugins.delete('prefetch');
    // 关闭自动注入，手动在index.html按需加载
    // 会导致菜单切换时请求新资源，但可提高30%首屏渲染速度
    config.plugin('html').tap(options => {
      options[0].inject = false;
      options[0].title = PROJECT_NAME;
      // 向html模板注入 服务端URL地址,用于生产环境动态修改
      options[0].HOST_URL = process.env.VUE_APP_HOST_URL;
      options[0].PREFIX_URL = process.env.VUE_APP_API_URL;
      return options;
    });
    // 构建时不打包公共资源，使用cdn加速
    if (process.env.VUE_APP_CDN === 'true') {
      // 编译时排除
      config.externals({
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        axios: 'axios',
        lodash: '_',
        jsoneditor: 'JSONEditor',
        'core-js': 'core',
        'element-pro-crud': 'ProCrud', // 若为按需引入,需要直接打包,不支持cdn引入
      });
      // 向模板插入资源
      config.plugin('html-assets').use(HtmlWebpackIncludeAssetsPlugin, [
        {
          assets: [
            '/vue@2.6.11/dist/vue.min.js',
            '/vuex@3.5.1/dist/vuex.min.js',
            '/vue-router@3.4.3/dist/vue-router.min.js',
            '/element-ui@2.15.0/lib/index.js',
            '/element-ui@2.15.0/lib/theme-chalk/index.css',
            '/axios@0.19.2/dist/axios.min.js',
            '/lodash@4.17.14/lodash.min.js',
            '/core-js@2.6.5/client/shim.min.js',
            '/element-pro-crud@0.9.4-11/lib/pro-crud.js', // 若为按需引入,需要直接打包,不支持cdn引入
            '/element-pro-crud@0.9.4-11/lib/css/pro-crud.css', // 若为按需引入,需要直接打包,不支持cdn引入
          ],
          append: false,
          // hash: true,
          publicPath: 'https://cdn.jsdelivr.net/npm',
        },
      ]);
    } else {
      // 不用cdn加速时，编译favcion
      config.plugin('html').tap(options => {
        options[0].favicon = './public/favicon.ico';
        return options;
      });
    }
  },
  configureWebpack: config => {
    if (!isDev) {
      // 开启gzip压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp(`\\.(${['js', 'css'].join('|')})$`),
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // eslint-disable-next-line global-require
        implementation: require('sass'), // This line must in sass option
      },
    },
  },
};
