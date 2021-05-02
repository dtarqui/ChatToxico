<template>
  <v-container>
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <template v-slot:activator="{ on, attrs }">
        <v-card-text class="text-end">
          <v-btn color="primary" v-bind="attrs" v-on="on">
            <slot></slot>
          </v-btn>
        </v-card-text>
      </template>
      <div>
        <v-tabs
          v-model="tab"
          show-arrows
          background-color="primary"
          icons-and-text
          dark
          grow
          center-active
          centered
        >
          <v-tabs-slider color="purple darken-4"></v-tabs-slider>
          <v-tab v-for="(i, index) in tabs" :key="index">
            <v-icon>{{ i.icon }}</v-icon>
            <div class="caption py-1">{{ i.name }}</div>
          </v-tab>
          <v-tab-item>
            <v-card class="px-4 justify-center">
              <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginEmail"
                        :rules="loginEmailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginPassword"
                        :append-icon="show1 ? 'eye' : 'eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Contraseña"
                        hint="Al menos 8 caracteres"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-spacer></v-spacer> -->
                    <v-col cols="12" sm="6" md="6" align-self="start">
                      <v-btn color="secondary" block @click="dialog = !dialog">
                        Cancelar
                      </v-btn>
                    </v-col>
                    <v-col cols="12" sm="6" md="6" align-self="end">
                      <v-btn
                        block
                        :disabled="!valid"
                        color="primary"
                        @click="validate"
                      >
                        Iniciar Sesion
                      </v-btn>
                    </v-col>
                    <!-- <v-col cols="12">
                      <v-btn> OAuth </v-btn>
                    </v-col> -->
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card class="px-4">
              <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="firstName"
                        :rules="[rules.required]"
                        label="Nombre"
                        maxlength="20"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="lastName"
                        :rules="[rules.required]"
                        label="Apellido"
                        maxlength="20"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Contraseña"
                        hint="At least 8 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        block
                        v-model="verify"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, passwordMatch]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Confirmar contraseña"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn
                        x-large
                        block
                        :disabled="!valid"
                        color="success"
                        @click="validate"
                        >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-dialog>
  </v-container>
</template>

<script>
import { rules } from "../../mixins/rules";
export default {
  mixins: [rules],
  computed: {
    passwordMatch() {
      return () =>
        this.password === this.verify || "Las contraseñas no coinciden";
    },
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  data: () => ({
    dialog: false,
    tab: 0,
    tabs: [
      { name: "Iniciar Sesion", icon: "mdi-login" },
      { name: "Registrarse", icon: "mdi-account" },
    ],
    valid: true,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    show1: false,
  }),
};
</script>

<style>
</style>