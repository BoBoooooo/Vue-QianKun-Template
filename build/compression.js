/*
 * @file: 自动打包编译后的文件
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2021年05月27日15:28:15
 */
const fs = require("fs");
const compressing = require("compressing");
const path = require("path");
const { success, info, err } = require("./consoleTemplate");

// 基座+所有子应用名称
const apps = ["main", "sub-react", "sub-vue", "sub-vue3"];

info("正在压缩", "请稍后");

// 创建流,分别读取文件夹
const stream = new compressing.zip.Stream();
for (const app of apps) {
  stream.addEntry(dir(app));
}

// 输出到dist.zip
stream.pipe(fs.createWriteStream(`dist.zip`));

stream
  .on("end", () => {
    success("打包成功", "已生成在根目录 dist.zip");
    // 打包成功后删除各个项目build文件夹
    for (const app of apps) {
      deleteDir(dir(app));
    }
  })
  .on("error", (error) => {
    err("打包失败", error);
  });

function deleteDir(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = `${folderPath}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        deleteDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

function dir(url){
  return `${path.resolve(__dirname, "../packages")}/${url}/${url}`
}