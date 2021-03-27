<template>
  <v-card class="mx-auto" width="95%">
    <v-card-subtitle>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6">
          <v-card class="justify-center">
            <div align="center">
              <v-img
                height="50%"
                width="50%"
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/upload-chat-1-783524.png"
              ></v-img>
            </div>
            <v-card-text primary-title class="justify-center text-center">
              Analiza tus mensajes con varias personas subiendo tu chat
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" small to="/upload_chat">Subir Chat</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card class="mx-auto">
            <div align="center">
              <v-img
                height="50%"
                width="50%"
                src="https://www.pngjoy.com/pngm/523/8307887_write-icon-write-in-chat-transparent-png.png"
              ></v-img>
            </div>
            <v-card-text class="layout justify-center text-center">
              Analiza tus mensajes de texto que tienes con una persona
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" small to="/write_chat">Escribelo</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>