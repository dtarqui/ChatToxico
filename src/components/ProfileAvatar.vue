<template>
  <!-- <v-container fluid style="height: 300px"> -->
  <v-menu bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar color="primary" size="48">
          <v-img v-if="user.picture" :src="user.picture" alt="John" />
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <h3>{{ $auth.user.name }}</h3>
          <p class="caption mt-1">
            {{ $auth.user.email }}
          </p>

          <v-btn depressed text to="/account"> Cuenta </v-btn>
          <br />
          <v-btn depressed text @click="logout"> Cerrar Sesion </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
  <!-- </v-container> -->
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return { initials: "SD" };
      },
    },
  },
  data: () => ({}),

  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    },
  },
};
</script>
