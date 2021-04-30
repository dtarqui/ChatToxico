<template>
  <div>
    <HomeRedirects></HomeRedirects>
    <br />
    <HomeInfo :image="require('../assets/write_your_chat.jpg')">
      <template v-slot:title>Escribe tu chat </template>
      <template v-slot:subtitle>Escribiendo tu chat </template>
      Si tu chat es muy pequeño o deseas saber si una posible conversación es
      toxica, puedes escribirlo y pulsar el botón de enviar para que podamos
      procesarlo y devolverte los resultados.
    </HomeInfo>
    <br />
    <HomeInfo :image="require('../assets/upload_your_chat.jpg')">
      <template v-slot:title>Envianos tu chat </template>
      <template v-slot:subtitle>Subiendo tu chat </template>
      Puede subir tu chat de tal forma y así obtener los resultados. Descarga tu
      chat en un archivo de texto, asegúrate que su tamaño sea menor a 20MB. Ve
      a la pagina para subir tu chat, selecciona el archivo que quieres analizar
      y pulsa “analizar” para obtener resultados. Si deseas puedes editarlo
      pulsando el botón de “previsualizar” antes de enviarlo pulsado el botón de
      “analizar” y así tener una mejor precisión.
    </HomeInfo>
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
