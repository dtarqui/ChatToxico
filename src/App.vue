<template>
  <v-app>
    <NavBar></NavBar>
    <v-main>
      <!-- <v-parallax
        src="./assets/background.jpg"
        direction="down"
        :parallax="true"
        height="2000px"
      > -->
      <v-row>
        <v-col cols="12">
          <div id="app">
            <br />
            <transition name="slide" mode="out-in">
              <router-view></router-view>
            </transition>
            <br />
          </div>
        </v-col>
      </v-row>
      <!-- </v-parallax> -->
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",

  components: {
    NavBar,
    Footer,
  },

  data: () => ({
    //
  }),
  mounted() {
    console.log(this.$auth);
    // console.log(this.$auth.getIdTokenClaims());
    // console.log(this.$auth.getTokenSilently());
    // console.log(this.$auth.getTokenWithPopup());
  },
};
</script>

<style scoped>
.slide-enter-active {
  animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}
</style>
