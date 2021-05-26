<!--
 * @file: 首页
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2021-05-26 15:33:50
-->
<template>
  <div class="container">
    <h2>当前为主应用 main</h2>

    <h2>点击下方按钮可以跳转到各自子应用</h2>
    <el-button type="primary" v-for="(app, index) in microApps" :key="index" @click="goTo(app)">
      {{ app.name }}
    </el-button>
  </div>
</template>

<script>
import microApps from '@/router/micro-app';

export default {
  name: 'Dashboard',
  data() {
    return {
      microApps,
    };
  },
  methods: {
    goTo(app) {
      window.history.pushState(null, app.activeRule, app.activeRule);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}
</style>
