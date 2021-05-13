<template>
  <div id="app">
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
html,body {
  height: 100%;
  overflow: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-size:15px!important;
  font-family:  Microsoft YaHei;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
