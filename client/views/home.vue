<template>
  <div
    style="
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      padding: 3em 3em 0 3em;
    "
  >
    <v-app-bar color="transparent" dense style="padding-bottom: 5%">
      <v-toolbar-title class="fontStyle">Maicon Almeida</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text> Home </v-btn>

      <v-btn text @click="toPortifolio"> Portifólio </v-btn>

      <v-btn text @click="getOut" v-if="loggedUser"> 
          {{loggedUser.name}} 
          <v-icon
              right
              dark
          >
          mdi-logout
          </v-icon>
      </v-btn>

    </v-app-bar>
    <template>
      <v-parallax :src="paralaxImage" style="height: 88%"></v-parallax>
    </template>
    <template>
      <v-dialog v-model="login" width="25%">
        <v-card elevation="10" class="pa-4" v-if="!newUser">
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                prepend-icon="mdi-email"
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
                v-model="access.email"
                required
              />
              <v-text-field
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
                :rules="[rules.required]"
                v-model="access.password"
                @keypress.enter="getIn()"
                required
              />
              <v-btn
                class="primary mt-4"
                block
                :disabled="!valid"
                @click="getIn()"
              >
                <span> Sign in </span>
              </v-btn>
              <v-btn
                class="warning mt-4"
                block
                @click= "newUser = !newUser"
              >
                <span> New user </span>
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card elevation="10" class="pa-4" v-if="newUser">
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                prepend-icon="mdi-account"
                label="Name"
                type="text"
                :rules="[rules.required]"
                v-model="newAccess.name"
                required
              />
              <v-text-field
                prepend-icon="mdi-email"
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
                v-model="newAccess.email"
                required
              />
              <v-text-field
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
                :rules="[rules.required]"
                v-model="newAccess.password"
                required
              />
              <v-text-field
                prepend-icon="mdi-lock"
                label="Confirm Password"
                type="password"
                :rules="[rules.required, rules.confirmPassword]"
                v-model="newAccess.confirmPassword"
                @keypress.enter="save()"
                required
              />
              <v-btn
                class="error mt-4"
                block
                @click="newUser = !newUser"
              >
                <span> Cancel </span>
              </v-btn>
              <v-btn
                class="success mt-4"
                block
                :disabled="!valid"
                @click="save()"
              >
                <span> Save </span>
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
    <v-snackbar v-model="showMessage" :color="colorMessage" top right>
        {{messageContent}}
    </v-snackbar>
  </div>
</template>

<script>

import loginGetin from '../src/app/login'
import saveUser from '../src/app/user'

export default {
  name: "home",
  data() {
    return {
      paralaxImage: require("../src/assets/home_image.jpg"),
      login: false,
      valid: false,
      newUser: false,
      loggedUser:false,
      access: {
        email: '',
        password: '',
      },
      newAccess: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
      },
      showMessage: null,
      messageContent: null,
      colorMessage: null,
      rules: {
        required: (val) => !!val || 'Must be filled!',
        email: (val) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(val) || 'Invalid email!';
        },
        confirmPassword: (val) => val === this.newAccess.password || 'Inconsistent passwords!'
      },
    };
  },
  methods: {
    getOut() {
        localStorage.clear()
        this.loggedUser = null
    },
    toPortifolio() {
        
        if(this.loggedUser) this.$router.push("/portfolio")
        else this.login = true
    },
    buildLoginResponse(response){
        if (response.name == 'Error') this.messageError(response)
        else this.successLogin(response)
    },
    successLogin(response) {
        localStorage.loggedUser = JSON.stringify(response.data)
        this.$router.push("/portfolio")
    },
    messageError(response) {
        this.showMessage = true
        this.messageContent = response.message
        this.colorMessage = 'red'
    },
    buildUserResponse(response){
        if (response.name == 'Error') this.messageError(response)
        else this.successUser(response)
    },
    successUser() {
        this.showMessage = true
        this.messageContent = this.newAccess.name + ' successfully registered!'
        this.colorMessage = 'green'
        this.newUser = false
    },
    async getIn() {
        this.loading = true
        await loginGetin(this.access)
            .then(this.buildLoginResponse)
        this.loading = false
    },

    async save() {
        this.loading = true
        await saveUser(this.newAccess)
            .then(this.buildUserResponse)
        this.loading = false
    },
  },
  mounted() {
      this.loggedUser = localStorage.getItem('loggedUser')
      if(this.loggedUser === "[object Object]") this.loggedUser = null
      if(this.loggedUser) this.loggedUser = JSON.parse(this.loggedUser)
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

.fontStyle {
  font-size: 30px !important;
  font-family: "Pacifico", cursive !important;
}

.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
</style>
