<template>
  <div class="layout-wrapper">
    <!-- <div class="layout-header">
      <div class="logo">{{title}}</div>
      <ul class="sub-apps">
        <li
          v-for="item in microApps"
          :class="{ active: item.activeRule === current }"
          :key="item.name"
          @click="goto(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="userinfo">主应用的state：{{ JSON.stringify(user) }}</div>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>
import NProgress from "nprogress";
import store from "@/store";
import microApps from "@/router/micro-app";

export default {
  name: "App",
  data() {
    return {
      isLoading: true,
      microApps,
      current: "/sub-vue/",
    };
  },
  computed: {
    user() {
      return store.getGlobalState("user");
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
  methods: {
    goto(item) {
      window.history.pushState(null, item.activeRule, item.activeRule);
      // this.current = item.name
    },
    bindCurrent() {
      const path = window.location.pathname;
      if (this.microApps.findIndex((item) => item.activeRule === path) >= 0) {
        this.current = path;
      }
    },
    listenRouterChange() {
      const _wr = function F(type) {
        const orig = window.history[type];
        return function F_(...args) {
          const rv = orig.apply(this, args);
          const e = new Event(type);
          e.arguments = args;
          window.dispatchEvent(e);
          return rv;
        };
      };
      window.history.pushState = _wr("pushState");

      window.addEventListener("pushState", this.bindCurrent);
      window.addEventListener("popstate", this.bindCurrent);

      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("pushState", this.bindCurrent);
        window.removeEventListener("popstate", this.bindCurrent);
      });
    },
  },
  created() {
    this.bindCurrent();
    NProgress.start();
  },
  mounted() {
    this.listenRouterChange();
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
