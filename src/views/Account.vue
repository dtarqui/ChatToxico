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
        <h2>{{ $auth.user.name }}</h2>
        <p class="lead text-muted">{{ $auth.user.email }}</p>
      </div>
    </div>

    <div class="row">
      <v-card>
        <v-card-text class="rounded w-100">{{
          JSON.stringify($auth.user, null, 2)
        }}</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>
