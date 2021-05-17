<template>
  <div class="container">
    <div class="row align-items-center profile-header">
      <div class="col-md-2 mb-3">
        <img
          :src="$auth.user.picture"
          alt="User's profile picture"
          class="rounded-circle img-fluid profile-picture"
        />
      </div>
      <div class="col-md text-center text-md-left">
        <h2>{{ $auth.user.nickname }}</h2>
        <p class="lead text-muted">{{ $auth.user.email }}</p>
      </div>
    </div>

    <div class="row">
<!--      <v-card>-->
<!--        <v-card-text class="rounded w-100">{{-->
<!--          JSON.stringify($auth.user, null, 2)-->
<!--        }}</v-card-text>-->
<!--      </v-card>-->
      <v-card
          class="pt-6 mx-auto"
          flat
          max-width="400"
      >
        <v-row
            class="text-left"
            tag="v-card-text"
        >
          <v-col
              class="text-right mr-4 mb-2"
              tag="strong"
              cols="5"
          >
            Name:
          </v-col>
          <v-col>{{ $auth.name }}</v-col>
          <v-col
              class="text-right mr-4 mb-2"
              tag="strong"
              cols="5"
          >
            Email:
          </v-col>
          <v-col>{{ $auth.email }}</v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
