<template>
    <div class="login">
        <v-card class="container mt-10 pa-5" max-width="500px" elevation="5" shaped>
            <h1>Login</h1>
            <v-text-field class="mt-5" label="Email" outlined v-model="Email"></v-text-field>
            <v-text-field class="mt-5" label="Password" outlined v-model="Password"></v-text-field>
            <p v-if="feedback">{{feedback}}</p>
            <v-btn rounded flat outlined large class="pink" color="white" @click.prevent="login">Login</v-btn>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: 'Login',
       data(){
           return {
               Email: null,
               Password: null,
               feedback: null
           }
       },
       methods: {
           login(){
               console.log(this.Email, this.Password)
           }
       } 
    }
</script>

<style lang="scss" scoped>

</style>