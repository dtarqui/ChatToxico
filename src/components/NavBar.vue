<template>
  <div>
    <v-app-bar
      color="#6A76AB"
      dark
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      prominent
      height="150%"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <h2>Chat Toxico</h2>
      </v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(routes, index) in routing"
            :key="index"
            :to="routes.to"
          >
            <v-list-item-icon>
              <v-icon>{{ routes.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ routes.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1000px"></v-container>
    </v-sheet> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    routing: [
      {
        to: "/",
        text: "Home",
        icon: "mdi-home",
      },
      {
        to: "/write_chat",
        text: "Write Chat",
        icon: "mdi-home",
      },
      {
        to: "/upload_chat",
        text: "Upload Chat",
        icon: "mdi-home",
      },
      {
        to: "/about",
        text: "About",
        icon: "mdi-home",
      },
    ],
  }),
};
</script>