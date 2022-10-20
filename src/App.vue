<template>
  <main-navigation></main-navigation>
  <main>
    <router-view></router-view>
  </main>
</template>
<script>
import { v4 as uuidv4 } from "uuid";

// components
import MainNavigation from "./components/navigation/MainNavigation.vue";

export default {
  name: "App",
  components: {
    "main-navigation": MainNavigation,
  },
  data() {
    return {
      id: uuidv4(),
    };
  },
  methods: {},
};
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

.error {
  color: red;
}
</style>
