<template>
  <v-container class="fill-height">
    <v-row class="fill-height pb-14" align="end">
      <v-col>
        <div
          v-for="(item, index) in chat"
          :key="index"
          :class="[
            'd-flex flex-row align-center my-2',
            item.from != users[0] ? 'justify-end' : null,
          ]"
        >
          <span v-if="item.from != users[0]" class="blue--text mr-3">{{
            item.msg
          }}</span>
          <v-avatar :color="item.from == users[0] ? 'indigo' : 'red'" size="36">
            <span class="white--text">{{
              item.from.charAt(0) + item.from.charAt(1) + item.from.charAt(2)
            }}</span>
          </v-avatar>
          <span v-if="item.from == users[0]" class="blue--text ml-3">{{
            item.msg
          }}</span>
        </div>
      </v-col>
    </v-row>
    {{ users }}
  </v-container>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
    },
    chat: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    msg: null,
  }),
  updated() {
    console.log(this.users);
  },
  methods: {
    send: function () {
      this.chat.push({
        from: "user",
        msg: this.msg,
      });
      this.msg = null;
      this.addReply();
    },
    addReply() {
      this.chat.push({
        from: "sushant",
        msg: "Hmm",
      });
    },
  },
};
</script>

<style>
</style>