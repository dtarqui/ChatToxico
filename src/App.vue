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
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar";
export default {
  name: "App",

  components: {
    NavBar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
