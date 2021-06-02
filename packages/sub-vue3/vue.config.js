// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require('./package.json');

module.exports = {
  publicPath: '/subapp/sub-vue3',
  // 打包时项目名称
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  // 生产环境打包时不启用SourceMap
  productionSourceMap: false,
  transpileDependencies: ['common'],
  // filenameHashing: true,
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
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
