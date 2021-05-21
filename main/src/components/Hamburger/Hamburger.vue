<!--
@file 顶部收缩按钮
@author ytyang
@copyright NanJing Anshare Tech .Com
@createDate 2018年12月23日19:29:43
-->
<!-- eslint-disable -->
<template>
  <div>
    <el-tooltip effect="dark"
                content="折叠菜单栏"
                placement="bottom">
      <i :class="isActive?'el-icon-s-fold':'el-icon-s-unfold'" class="hamburger" @click="toggleClick"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    toggleClick: {
      type: Function,
      default: null,
    },
  },
};
</script>

<style scoped>
.hamburger {
  font-size: 26px;
  padding-left: 20px;
}
</style>
