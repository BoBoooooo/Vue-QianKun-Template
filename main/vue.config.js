const path = require("path");

const PROJECT_NAME = process.env.VUE_APP_NAME;

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

module.exports = {
  transpileDependencies: ["common"],
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
      .end();
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
