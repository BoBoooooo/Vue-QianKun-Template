<!--
@file 框架页布局
@author BoBo
@copyright BoBo
@createDate 2018年11月13日14:50:08
-->
<template>
  <div class="app-wrapper">
    <!-- 导航栏 -->
    <Header />
    <!-- 左侧菜单 -->
    <Menu />
    <div
      class="main-container"
      :class="{
        hideSidebar: !sidebar,
      }"
    >
      <!-- TAB标签页 -->
      <!-- <TagsView /> -->
      <!-- 二级路由 -->
      <AppMain />
    </div>

    <el-backtop target=".main-container"></el-backtop>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { AppMain, Header, Menu } from './components'

@Component({
  name: 'Layout',
  components: {
    AppMain,
    Header,
    Menu
  }
})
export default class Layout extends Vue {
  get sidebar () {
    // return this.$store.getters.sidebar.opened
    return true
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  overflow: hidden;
  height: 100%;
  background: #f0f3f7;
  // 主体区域
  .main-container {
    background: #f0f3f7;
    margin-left: 220px;
    padding: 20px;
    overflow: auto;
    box-sizing: border-box;
    height: calc(100% - 40px);
    margin-top: 60px;
    &.hideSidebar {
      margin-left: 80px;
    }
  }
}
</style>
