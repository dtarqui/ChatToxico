<template>
  <v-card>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="1" v-if="!end">
        <v-card-actions class="justify-center">
          <v-btn fab x-small>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
      <v-col cols="12" md="11">
        <v-card-title :class="[end ? 'justify-end' : null]">
          <!-- <v-avatar color="red">
        <span class="white--text headline">
          {{ from.charAt(0) + from.charAt(1) }}
        </span>
      </v-avatar> -->
          {{ from }}
        </v-card-title>
        <v-card-subtitle :class="[end ? 'text-end' : 'text-start']">{{
          message
        }}</v-card-subtitle>
      </v-col>
      <v-col cols="12" md="1" v-if="end">
        <v-card-actions class="justify-center">
          <v-btn fab x-small>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    from: { type: String, default: "from" },
    user: { type: Array },
    // user: { type: String, default: "A user" },
    message: { type: String, default: "message" },
    color: { type: String, default: "white" },
    end: {
      type: Boolean,
    },
  },
  data: () => ({}),
};
</script>

<style>
</style>