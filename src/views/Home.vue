<template>
  <div>
    <HomeRedirects></HomeRedirects>
    <br />
    <v-card class="mx-auto" width="70%" elevation="10" dark color="secondary">
      <v-card-title class="white--text">
        <v-img
          class="shrink mr-2"
          contain
          :src="require('../assets/logo_proy.png')"
          transition="scale-transition"
          width="40"
        />
        Chat Toxico
      </v-card-title>
    </v-card>
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
    <br />
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" width="70%" elevation="10" dark color="primary">
          <v-card-title>
            Necesitas mas ayuda?
            <v-btn text to="/about"> Pulsa aqui </v-btn>
            y te mostraremos como usar la herramienta
          </v-card-title>
          <v-card-text> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
