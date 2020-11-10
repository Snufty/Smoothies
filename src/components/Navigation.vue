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
      <v-btn v-if="!user" color="pink" class="ma-1">
        <p class="ma-0" right>Sign Up</p>
      </v-btn>
    </router-link>

    <router-link :to="{name: 'Login'}">
      <v-btn v-if="!user" color="pink" class="ma-1">
        <p class="ma-0" right>Login</p>
      </v-btn>
    </router-link>

    <li v-if="user">{{user.email}}</li>

    <v-btn v-if="user" color="pink" class="ma-1" @click="logout">
      <p class="ma-0">Logout</p>
    </v-btn>

    <div id="filler"></div>
      
      <router-link :to="{name: 'AddSmoothie'}">
        <v-btn v-if="user" fab color="pink" class="mr-7" absolute right bottom>
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
        user: null
      }
    },
    methods: {
      logout(){
        firebase.auth().signOut()
        .then(()=>{
          this.$router.push({ name: 'Login'})
        })
      }
    },
    created(){
      //let user = firebase.auth().currentUser
      firebase.auth().onAuthStateChanged((user => {
        if(user){
          this.user = user
        } else {
          this.user = null
        }
      }))
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

li {
  list-style: none;
  margin-right: 10px;
}
</style>