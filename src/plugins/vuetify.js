import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // primary: "#1976D2",
        primary: "#056743",
        secondary: "#424242",
        tertiary: "#5B6D97",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        navbar: "#373941",
        positive: "#2fc24c",
        negative: "#666666",
        neutral: "#BB8F6A",
        mixed: "#e0db4a",
      },
    },
  },
});
