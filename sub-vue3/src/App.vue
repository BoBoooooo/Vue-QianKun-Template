<template>
  <div class="container">
    <router-link to="/"><el-button type="text">Home</el-button></router-link> |
    <router-link to="/test"><el-button type="text">Test</el-button></router-link>
    <HelloWorld msg="Welcome to Your Vue3.js App" />
    <router-view />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  h2 {
    display: inline-block;
  }
}
</style>
