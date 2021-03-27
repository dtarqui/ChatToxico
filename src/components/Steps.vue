<template>
  <v-card class="mx-auto">
    <slot></slot>
    <v-card-title primary-title class="justify-center">
      <slot name="title"></slot>
    </v-card-title>
    <v-card-text class="text-center">
      <slot name="text"></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>