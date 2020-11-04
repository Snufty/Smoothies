<template>
  <div>
    <v-toolbar
      flat
      color="indigo"
      dark
    >
    <router-link class="link" :to="{name: 'Home'}">
      <v-toolbar-title>SMOOTHIE RECIPES</v-toolbar-title>
    </router-link>

      <v-spacer></v-spacer>

    <router-link :to="{name: 'Signup'}">
      <v-btn color="pink" class="ma-1">
        <p class="ma-0" right>Sign Up</p>
      </v-btn>
    </router-link>

    <router-link :to="{name: 'Login'}">
      <v-btn color="pink" class="ma-1">
        <p class="ma-0" right>Login</p>
      </v-btn>
    </router-link>

    <v-btn color="pink" class="ma-1" @click="logout">
      <p class="ma-0">Logout</p>
    </v-btn>

    <div id="filler"></div>
      
      <router-link :to="{name: 'AddSmoothie'}">
        <v-btn fab color="pink" class="mr-7" absolute right bottom>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>

    </v-toolbar>
  </div>
</template>

<script>
import firebase from 'firebase'
  export default {
    data(){
      return {

      }
    },
    methods: {
      logout(){
        firebase.auth().signOut()
        .then(()=>{
          this.$router.push({ name: 'Signup'})
        })
      }
    }
}
</script>

<style lang="scss" scoped>
.link{
  text-decoration: none;
  color: white;
}

#filler {
  height: 100%;
  width: 100px
}
</style>