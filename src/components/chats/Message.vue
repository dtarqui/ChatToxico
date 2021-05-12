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
        <v-card-title :class="[end ? 'justify-end' : null]">
<!--          <v-avatar color="red">-->
<!--            <span class="white&#45;&#45;text headline">-->
<!--              {{ from.charAt(0) + from.charAt(1) }}-->
<!--            </span>-->
<!--          </v-avatar>-->
          {{ from }}
        </v-card-title>
        <v-card-subtitle :class="[end ? 'text-end' : 'text-start']">{{
          message
        }}</v-card-subtitle>
      </v-col>
      <v-col cols="12" md="2">
        <v-icon color="red">{{emoticon}}</v-icon>
      </v-col>
<!--      <v-col cols="12" md="1" v-if="end">-->
<!--        <v-card-actions class="justify-center">-->
<!--          <v-btn fab x-small @click="deleteRow()">-->
<!--            <v-icon>mdi-close</v-icon>-->
<!--          </v-btn>-->
<!--        </v-card-actions>-->
<!--      </v-col>-->
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: {
      type: Number,
      default: -1,
    },
    from: {type: String, default: "from"},
    user: {type: Array},
    // user: { type: String, default: "A user" },
    message: {type: String, default: "message"},
    color: {type: String, default: "white"},
    end: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    emoticon: ""
  }),
  mounted() {
    axios
        .post("sentiment", {text: this.message})
        .then((res) => {
          this.result = res.data;
          if (this.result.positive){
            this.result.positive
            this.emoticon=this.majorResult(this.result);
          }
        })
        .finally(() => {
          this.analizing = false;
        });
  },
  methods: {
    majorResult(result){
      const emo={
        emoticon: "",
        color: ""
      }
      if(result.positive>=result.negative || result.positive>=result.mixed || result.positive>=result.neutral){
        emo.emoticon="mdi-emoticon"
        emo.color="red"
        return emo
      }
      if(result.negative>=result.positive || result.negative>=result.mixed || result.negative>=result.neutral){
        return "mdi-emoticon-devil"
      }
      if(result.neutral>=result.negative || result.neutral>=result.mixed || result.neutral>=result.positive){
        return "mdi-emoticon-devil"
      }
      if(result.mixed>=result.negative || result.mixed>=result.positive || result.mixed>=result.neutral){
        return "mdi-emoticon-devil"
      }

    },

    deleteRow() {
      this.$emit("deleteRow", this.id);
    },
  },
};
</script>

<style>
</style>
