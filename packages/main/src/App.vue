<template>
  <div class="layout-wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
import NProgress from 'nprogress';
import store from '@/store';

export default {
  name: 'App',
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    user() {
      return store.getGlobalState('user');
    },
    title() {
      return process.env.VUE_APP_NAME;
    },
  },
  watch: {
    isLoading(val) {
      if (val) {
        NProgress.start();
      } else {
        this.$nextTick(() => {
          NProgress.done();
        });
      }
    },
  },
  components: {},
  created() {
    NProgress.start();
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0 !important;
  padding: 0;
}
.layout-wrapper {
  height: 100%;
  .layout-header {
    height: 50px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    line-height: 50px;
    position: relative;
    .logo {
      float: left;
      margin: 0 50px;
      width: 200px;
    }
    .sub-apps {
      list-style: none;
      margin: 0;
      li {
        list-style: none;
        display: inline-block;
        padding: 0 20px;
        cursor: pointer;
        &.active {
          color: #42b983;
          text-decoration: underline;
        }
      }
    }
    .userinfo {
      position: absolute;
      right: 100px;
      top: 0;
    }
  }
}
</style>
