<template>
  <v-card class="mx-auto" width="70%" flat>
    <v-card-subtitle>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="5">
          <v-card elevation="10" id="round">
            <v-card-text>
              <div align="center">
                <v-img
                  id="rounded"
                  height="150px"
                  width="150px"
                  :gradient="'to top right, rgba(127, 190, 51, 0.7), rgba(1, 103, 64, 0.4)'"
                  src="../assets/upload_chat.png"
                ></v-img>
              </div>
            </v-card-text>
            <v-card-text primary-title class="justify-center text-center">
              Analiza tus mensajes con varias personas subiendo tu chat
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" small to="/upload_chat">Subir Chat</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
            <br />
          </v-card>
        </v-col>
        <v-col cols="12" md="1" sm="12"></v-col>
        <v-col cols="12" sm="6" md="5">
          <v-card elevation="10" id="round">
            <v-card-text>
              <div align="center">
                <v-img
                  id="rounded"
                  height="150px"
                  width="150px"
                  :gradient="'to top right, rgba(1, 103, 64, 0.4), rgba(127, 190, 51, 0.7)'"
                  src="../assets/write_chat.png"
                ></v-img>
              </div>
            </v-card-text>
            <v-card-text class="layout justify-center text-center">
              Analiza tus mensajes de texto que tienes con una persona
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" small to="/write_chat">Escribelo</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
            <br />
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
#rounded {
  border-radius: 30%;
}
#round {
  border-radius: 10%;
}
</style>