<!--
 * @file: 顶部导航
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2019-04-26 15:26:49
 -->

<template>
  <div>
    <el-header
      height="60px"
      :style="{
        background: themeColor.header.backgroundColor,
      }"
      class="header"
      :class="{
        hideSidebar: !sidebar,
      }"
    >
      <!-- 折叠侧边栏按钮 -->
      <Hamburger
        :toggle-click="toggleSideBar"
        :is-active="!!sidebar"
        :style="{
          color: themeColor.header.textColor,
        }"
        class="hamburger-container"
        :class="{
          isActive: !sidebar,
        }"
      />
      <!-- 面包屑导航 -->
      <!-- <Breadcrumb></Breadcrumb> -->

      <div class="header-right-container">
        <span
          >当前基座中的姓名为:
          <el-tag size="medium" type="danger" style="margin: 0 10px"> {{ user.name }}</el-tag></span
        >
        <el-button type="primary" size="medium" @click="updateGlobalState">更新全局状态</el-button>
        <!-- 姓名及下拉菜单 -->
        <div class="user-container">
          <img :src="photo" v-if="photo" class="photo" @click="showCard" />
          <svgIcon class="photo" v-else icon-class="teacher"></svgIcon>
          <span
            :style="{
              color: themeColor.header.textColor,
            }"
            class="userName el-dropdown-link"
          >
            {{ this.$store.getters.realname }}</span
          >
          <i
            :style="{
              color: themeColor.header.textColor,
            }"
            class="el-icon-switch-button icon"
            @click="logOut"
          ></i>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import themeColor from '@/styles/theme';
import Hamburger from '@/components/Hamburger/Hamburger.vue';
import store from '@/store';

@Component({
  name: 'Header',
  components: {
    Hamburger,
  },
})
export default class Header extends Vue {
  @Getter config;

  @Getter photo;

  themeColor = themeColor;

  get user() {
    return store.getGlobalState('user');
  }

  get sidebar() {
    return this.$store.getters.sidebar.opened;
  }

  toggleSideBar() {
    this.$store.dispatch('ToggleSideBar');
  }

  logOut() {
    this.$store.dispatch('clearToken');
  }

  updateGlobalState() {
    // 更新状态 调用全局方法setGlobalState,会触发onGlobalStateChange方法
    store.setGlobalState({
      user: {
        name: '李四',
      },
    });
    this.$message.success('姓名已更新为李四');
  }
}
</script>
<style scoped>
.tag >>> .el-tag__close {
  margin-top: 2px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-header {
  position: fixed;
  left: 220px;
  right: 0;
  color: black;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  &.hideSidebar {
    left: 64px;
  }
  .hamburger-container {
    display: inline-block;
    height: 60px;
    line-height: 60px;
  }
  .logo {
    width: 2em;
    height: 2em;
    position: relative;
    top: 0.5em;
  }
}
.elevator {
  float: right;
  line-height: 100px;
  height: 64px;
  margin-right: 50px;
}
.header-right-container {
  align-items: center;
  justify-content: flex-end;
  right: 30px;
  position: absolute;
  display: flex;
  height: 60px;
  // 姓名及下拉菜单
  .user-container {
    height: 64px;
    float: right;
    line-height: 64px;
    text-align: center;
    .photo {
      width: 40px;
      height: 40px;
      vertical-align: -17px;
      border-radius: 50%;
      cursor: pointer;
    }
    .userName {
      text-align: center;
      vertical-align: middle;
      margin-left: 10px;
      margin-right: 5px;
      font-size: 14px;
    }
    .icon {
      font-size: 14px;
      display: inline;
      outline: none;
      cursor: pointer;
    }
    .user_icon {
      width: 28px;
      height: 28px;
      margin-top: 10px;
      margin-bottom: 8px;
      display: block;
      cursor: pointer;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
