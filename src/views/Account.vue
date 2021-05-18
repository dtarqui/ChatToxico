<template>
  <div class="container">
    <div class="row align-items-center profile-header">
      <div class="col-md-2 mb-3" v-if="user.photo==null">
        <img
          :src="results.picture"
          alt="User's profile picture"
          class="rounded-circle img-fluid profile-picture"
        />
      </div>
      <div class="col-md-2 mb-3" v-if="user.photo!=null">
        <img
            :src="user.photo"
            alt="User's profile picture"
            class="rounded-circle img-fluid profile-picture"
        />
      </div>
      <div class="col-md text-center text-md-left">
        <h2>{{ results.nickname }}</h2>
        <p class="lead text-muted">{{ results.email }}</p>
      </div>
      <v-card-text>
        <v-text-field
            v-model="user.username"
            label="Username"
            outlined
            disabled
            shaped
        ></v-text-field>
      </v-card-text>

      <v-card-text>
        <v-text-field
            v-model="user.name"
            label="Nombres"
            outlined
            disabled
            shaped
        ></v-text-field>
      </v-card-text>
      <v-card-text>
        <v-text-field
            v-model="user.lastName"
            label="Apellidos"
            outlined
            disabled
            shaped
        ></v-text-field>
      </v-card-text>

      <v-card-text>
        <v-text-field
            v-model="user.email"
            label="Email"
            outlined
            disabled
            shaped
        ></v-text-field>
      </v-card-text>
      <v-card-text>
        <v-text-field
            v-model="user.gender"
            label="Genero"
            outlined
            disabled
            shaped
        ></v-text-field>
      </v-card-text>



    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data: () => ({
    results: {},
    user: {}
  }),
  async mounted() {
    await this.getInfo()

  },

  methods:{
    async getInfo() {
      var axios = require("axios").default;
      const accessToken = await this.$auth.getTokenSilently();
      var options = {
        method: 'GET',
        url: 'https://fulano-es.us.auth0.com/userinfo',
        headers: {authorization: `Bearer ${accessToken}`}
      };
      axios.request(options).then((response)=> {
        this.results=response.data
      })
      this.getUserDetails()
    },
    getUserDetails(){
      const val=this.$auth.user.sub.split("|");
      const userId=val[1].trim();
      axios.get("user/"+userId)
          .then((value) => {
        this.user= value.data
      })
    }
  },
};
</script>

<style scoped>
</style>
