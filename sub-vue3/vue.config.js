const { name } = require('./package.json');

const port = 7779; // dev port

module.exports = {
  publicPath: '/subapp/sub-vue3',
  filenameHashing: true,
  devServer: {
    port,
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
};
