<template>
  <div>
    <HomeRedirects></HomeRedirects>
    <br />
    <HomeInfo></HomeInfo>
    <br />
    <HomeInfo></HomeInfo>
  </div>
</template>

<script>
import HomeRedirects from "@/components/HomeRedirects.vue";
import HomeInfo from "@/components/HomeInfo.vue";

export default {
  name: "Home",
  components: {
    HomeRedirects,
    HomeInfo,
  },
};
</script>
