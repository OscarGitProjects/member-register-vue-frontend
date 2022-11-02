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

/* This is for the <transition> in vue */
.v-enter-from {
  opacity: 0;
  transform: translateY();
}

.v-enter-active {
  transition: all 1.5s ease-in-out;
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-active {
  transition: all 1.5s ease-in-out;
}

.v-leave-to {
  opacity: 0;
  transform: translateY(0);
}
</style>
