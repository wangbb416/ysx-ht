<template>
  <div id="app">
    <div></div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
html,
body,
#app {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  position: relative;
  z-index: 1;
}

body {
  margin: 0;
  background-color: #191c21;
  color: #dddddd;
}
</style>
