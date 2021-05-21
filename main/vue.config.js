// eslint-disable-next-line import/no-extraneous-dependencies
const path = require("path");

const PROJECT_NAME = process.env.VUE_APP_NAME;

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

module.exports = {
  transpileDependencies: ["common"],
  // 开发阶段服务器配置
  devServer: {
    port: process.env.PORT ? +process.env.PORT : 80,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));

    config.plugin("html").tap((args) => {
      args[0].title = PROJECT_NAME;
      return args;
    });
    // 从默认svg规则中排除src/icons路径，因为会当做图标自动加载
    config.module.rule("svg").exclude.add(resolve("src/icons"));
    // 添加svg-sprite-loader加载器
    config.module
      .rule("svg-sprite-loader")
      .test(/.svg$/)
      .include.add(resolve("src/icons")) // 处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end(); // 移除prefecth 提高首屏速度
    config.plugins.delete("prefetch");
    // 关闭自动注入，手动在index.html按需加载
    // 会导致菜单切换时请求新资源，但可提高30%首屏渲染速度
    config.plugin("html").tap((options) => {
      options[0].inject = false;
      options[0].title = PROJECT_NAME;
      // 向html模板注入 服务端URL地址,用于生产环境动态修改
      options[0].HOST_URL = process.env.VUE_APP_HOST_URL;
      options[0].PREFIX_URL = process.env.VUE_APP_API_URL;
      return options;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        // eslint-disable-next-line global-require
        implementation: require("sass"), // This line must in sass option
      },
    },
  },
};
