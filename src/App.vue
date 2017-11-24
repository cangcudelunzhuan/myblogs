<template>
  <div id="app">
    <input type="hidden" name="" v-model="title">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    title () {
        document.title = this.$store.getters.title
        return this.$store.getters.title
    }
  },
  mounted: function () {
    let strs=window.location.hash.split("/")
    this.$store.commit('ACTIVENAV', {activeNav: strs[strs.length-1]})
  },
}
</script>

<style>
@import 'styles/index.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

