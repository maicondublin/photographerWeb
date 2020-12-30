<template>
  <div style="width: 100%; height: 100%; padding: 3em">
    <v-app-bar color="transparent" dense style="padding-bottom: 5%">
        <v-toolbar-title class="fontStyle" style="font-size: 30px !important">
          Maicon Almeida
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn text @click="toHome"> Home </v-btn>

        <v-btn text> Portfolio </v-btn>

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
      <v-parallax :src="paralaxWedding">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <v-btn class="beforeNone" text @click="Wedding = !Wedding">
              <h1
                class="display-1 font-weight-thin mb-4 fontStyle"
                style="color: white !important"
              >
                Wedding
              </h1>
            </v-btn>
          </v-col>
        </v-row>
      </v-parallax>
    </template>
    <template>
      <v-parallax style="top: 20px; bottom: 20px" :src="paralaxArt">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <v-btn class="beforeNone" text @click="Art = !Art">
              <h1
                class="display-1 font-weight-thin mb-4 fontStyle"
                style="color: white !important"
              >
                Art
              </h1>
            </v-btn>
          </v-col>
        </v-row>
      </v-parallax>
    </template>
    <template>
      <v-parallax style="top: 40px; margin-bottom: 20px" :src="paralaxFashion">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <v-btn class="beforeNone" text @click="Fashion = !Fashion">
              <h1
                class="display-1 font-weight-thin mb-4 fontStyle"
                style="color: white !important"
              >
                Fashion
              </h1>
            </v-btn>
          </v-col>
        </v-row>
      </v-parallax>
    </template>
    <template>
      <v-dialog v-model="Wedding">
        <v-card>
          <template>
            <v-carousel hide-delimiters>
              <v-carousel-item
                v-for="item in weddingItems"
                :key="item.desc"
                :src="item.src"
              ></v-carousel-item>
            </v-carousel>
          </template>
        </v-card>
      </v-dialog>
    </template>
    <template>
      <v-dialog v-model="Art">
        <v-card>
          <template>
            <v-carousel hide-delimiters>
              <v-carousel-item
                v-for="item in artItems"
                :key="item.desc"
                :src="item.src"
              ></v-carousel-item>
            </v-carousel>
          </template>
        </v-card>
      </v-dialog>
    </template>
    <template>
      <v-dialog v-model="Fashion">
        <v-card>
          <template>
            <v-carousel hide-delimiters>
              <v-carousel-item
                v-for="item in fashionItems"
                :key="item.desc"
                :src="item.src"
              ></v-carousel-item>
            </v-carousel>
          </template>
        </v-card>
      </v-dialog>
    </template>
    <v-snackbar v-model="showMessage" :color="colorMessage" top right>
        {{messageContent}}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      showMessage: null,
      messageContent: null,
      colorMessage: null,
      paralaxWedding: require("../src/assets/casamento_1.jpg"),
      paralaxArt: require("../src/assets/arte_1.jpg"),
      paralaxFashion: require("../src/assets/fashion_1.jpg"),
      Wedding: false,
      Art: false,
      Fashion: false,
      weddingItems: [
        { src: require("../src/assets/casamento_1.jpg"), desc: "casamento_1" },
        { src: require("../src/assets/casamento_2.jpg"), desc: "casamento_2" },
        { src: require("../src/assets/casamento_3.jpg"), desc: "casamento_3" },
      ],
      artItems: [
        { src: require("../src/assets/arte_1.jpg"), desc: "arte_1" },
        { src: require("../src/assets/arte_2.jpg"), desc: "arte_2" },
        { src: require("../src/assets/arte_3.jpg"), desc: "arte_3" },
      ],
      fashionItems: [
        { src: require("../src/assets/fashion_1.jpg"), desc: "fashion_1" },
        { src: require("../src/assets/fashion_2.jpg"), desc: "fashion_2" },
        { src: require("../src/assets/fashion_3.jpg"), desc: "fashion_3" },
      ],
    };
  },
  methods: {
    getOut() {
      localStorage.clear()
      this.toHome()
    },
    toHome() {
      this.$router.push("/")
    },
    welcomeMessage(){
        this.showMessage = true
        this.messageContent = 'Welcome '+ this.loggedUser.name
        this.colorMessage = 'green'
    }
  },
  mounted() {
      this.loggedUser = localStorage.getItem('loggedUser')
      if(this.loggedUser){
        this.loggedUser = JSON.parse(this.loggedUser)
        this.welcomeMessage()
      } 
      else this.$router.push("/")
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");

.fontStyle {
  font-family: "Pacifico", cursive !important;
}

.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: none !important;
}

.hover:hover {
  cursor: pointer;
}

.beforeNone::before {
  display: none;
}
</style>
