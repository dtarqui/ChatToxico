<template>
  <v-footer default padless>
    <v-card flat tile width="100%" class="text-center">
      <v-img
        gradient="to top right, rgba(70, 150, 84, 0.7), rgba(100,115,201,.7)"
        height="120px"
        src="https://picsum.photos/1920/1080?random"
      >
        <v-card-text>
          <v-btn
            v-for="(route, i) in routing"
            :key="i"
            class="mx-4"
            icon
            :to="route.to"
            dark
          >
            <v-icon size="24px">
              {{ route.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider inset></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-img>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    routing: [
      {
        to: "/",
        icon: "mdi-home-outline",
      },
      {
        to: "/write_chat",
        icon: "mdi-typewriter",
      },
      {
        to: "/upload_chat",
        icon: "mdi-file-upload-outline",
      },
      // {
      //   to: "/about",
      //   icon: "mdi-nature-people",
      // },
      {
        to: "/faq",
        icon: "mdi-help-circle-outline",
      },
    ],
    variant: "default",
  }),
  computed: {
    localAttrs() {
      const attrs = {};
      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
};
</script>

<style>
</style>