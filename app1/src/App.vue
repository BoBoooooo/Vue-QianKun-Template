<template>
  <div id="app">
    <h1>子应用app1</h1>
    <router-link to="/" tag="p">home</router-link>
    <router-link to="/about" tag="p">about</router-link>
    <router-link to="/helloword" tag="p">helloword</router-link>

    <h1>router-view</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>

</style>
