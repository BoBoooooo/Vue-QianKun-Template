/*
 * @file: 让ts识别vue文件,声明第三方模块
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2020年06月22 16:26:22
 */
declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}
