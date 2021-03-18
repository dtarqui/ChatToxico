<template>
  <v-footer v-bind="localAttrs" :padless="padless">
    <v-card flat tile width="100%" class="text-center">
      <!-- src="https://picsum.photos/1920/1080?random" -->
      <v-img
        gradient="to top right, rgba(70, 150, 84, 0.7), rgba(100,115,201,.7)"
        height="20%"
      >
        <v-card-text>
          <v-btn v-for="(icon, i) in icons" :key="i" class="mx-4" icon>
            <v-icon size="24px">
              {{ icon }}
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
    icons: [
      "mdi-home-outline",
      "mdi-typewriter",
      "mdi-file-upload-outline",
      "mdi-help-circle-outline",
    ],
    items: ["default", "absolute", "fixed"],
    padless: true,
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