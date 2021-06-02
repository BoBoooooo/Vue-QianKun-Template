<template>
  <div class="container">
    <router-link to="/"><el-button type="text">Home</el-button></router-link> |
    <router-link to="/test"><el-button type="text">Test</el-button></router-link>
    <HelloWorld msg="Welcome to Your Vue3.js App" />
    <router-view />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}
</style>
