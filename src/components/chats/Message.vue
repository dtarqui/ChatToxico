<template>
  <v-card>
    <v-row align="center" justify="center" no-gutters>
<!--      <v-col cols="12" md="1" v-if="!end">-->
<!--        <v-card-actions class="justify-center">-->
<!--          <v-btn fab x-small @click="deleteRow()">-->
<!--            <v-icon>mdi-close</v-icon>-->
<!--          </v-btn>-->
<!--        </v-card-actions>-->
<!--      </v-col>-->
      <v-col cols="12" md="10">
        <v-card-title :class="[end ? 'justify-end' : null]" >
          <v-alert
              text
              :color="colorUser"
          >
            <h3 class="headline">
              {{ user }}
            </h3>
            <div>{{
                message
              }}</div>

          </v-alert>
        </v-card-title>
        <v-card-subtitle :class="[end ? 'text-end' : 'text-start']"></v-card-subtitle>
      </v-col>
      <v-col cols="12" md="2">
        <v-icon :color="coloremoticon">{{emoticon}}</v-icon>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  props: {
    id: {
      type: Number,
      default: -1,
    },
    emoticon: {type: String, default: "emoticon"},
    users: {type: Array},
    user: { type: String, default: "A user" },
    message: {type: String, default: "message"},
    coloremoticon: {type: String, default: ""},
    usercolor:{type: Array},
    end: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    colorUser: ""
  }),
  mounted() {
    this.userColor();
  },
  methods: {
    userColor(){
      this.usercolor.map(value => {
        if(value.user===this.user){
          this.colorUser=value.color;
        }
      })
    },
    deleteRow() {
      this.$emit("deleteRow", this.id);
    },
  },
};
</script>

<style>
</style>
