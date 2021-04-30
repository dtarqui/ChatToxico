<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-toolbar color="primary">
          <v-card-title class="white--text">
            Preguntas más frecuentes
          </v-card-title>
        </v-toolbar>
        <v-expansion-panels inset multiple>
          <v-expansion-panel v-for="(item, i) in 5" :key="i">
            <v-expansion-panel-header>
              Pregunta {{ i + 1 }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>