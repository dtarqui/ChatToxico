<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <div id="app">
        <br />
        <router-view />
        <br />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  name: "App",

  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>
