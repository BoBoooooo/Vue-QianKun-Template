<!--
@file 托管了基座路由渲染以及子应用入口
@author BoBo
@copyright BoBo
@createDate 2021年05月21日14:39:53
-->

<template>
  <section class="app-main" ref="appmain" @scroll="handleScroll">
    <router-view :scrollTop="scrollTop" :key="key" @viewScroll="viewScroll" />
    <div id="subapp-viewport"></div>
  </section>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import { start } from "qiankun";

@Component({
  name: "AppMain",
})
export default class AppMain extends Vue {
  scrollTop = 0;

  get cachedViews() {
    return this.$store.state.tagsView.cachedViews;
  }

  get key() {
    return this.$route.fullPath;
  }

  // 根据右侧滚动条实时刷新滚动条距离顶部的位置，并通过<router-view>传入子页面
  handleScroll() {
    this.scrollTop = this.$refs.appmain.scrollTop;
  }

  // 重定位滚动条
  viewScroll(v) {
    this.$refs.appmain.scrollTop = v;
  }

  mounted() {
    // 手动触发qiankun入口渲染
    // https://qiankun.umijs.org/zh/faq
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;
      start();
    }
  }
}
</script>
<style lang="scss" scoped>
.app-main {
  height: calc(100% - 40px);
}
</style>
