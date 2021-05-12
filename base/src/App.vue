<template>
  <div id="app">
    <a href="/">主应用</a>
    <a href="/vue">子应用</a>
    <router-view></router-view>
    <div id="container"></div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a{
  margin-right: 10px;
}
</style>
