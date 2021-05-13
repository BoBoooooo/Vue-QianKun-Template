<!--
 * @file: 布局模板
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-04-13 19:11:28
-->

<template>
  <el-container class="full-height">
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu full-height"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <router-link to="/layout/main/app1">
            <el-menu-item index="1-1">子系统app1</el-menu-item>
          </router-link>
          <router-link to="/layout/main/app2">
            <el-menu-item index="1-2">子系统app2</el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <div id="container"></div>
    </el-main>
  </el-container>
</template>

<script>
import { start } from "qiankun";

export default {
  name: "Layout",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start();
    }
  },
};
</script>

<style scoped>
.el-menu >>> .el-submenu__title {
  text-align: left;
}
.full-height {
  height: 100%;
}
#container {
  height: 100%;
}
</style>
