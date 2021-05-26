<template>
  <div id="app">
    <router-view />

    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <a href="#" @click="gotoSubReact" style="marin: 0 0 0 10px">跳转到 子应用 sub-react</a>
    </div>
    <el-tag>从vuex的global module的state： {{ JSON.stringify(user) }}</el-tag>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  computed: {
    user() {
      return this.$store.state.global.user.name;
    },
  },
  methods: {
    gotoSubReact() {
      history.pushState(null, 'sub-react', '/subapp/sub-react');
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
