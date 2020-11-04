<template>
    <div class="signup">
        <v-card class="container mt-10 pa-5" max-width="500px" elevation="5" shaped>
            <h1>Create a user</h1>
            <v-text-field class="mt-5" label="Email" outlined v-model="Email"></v-text-field>
            <v-text-field class="mt-5" label="Password" outlined v-model="Password"></v-text-field>
            <v-text-field class="mt-5" label="Username" outlined v-model="Username"></v-text-field>
            <p class="feedback" v-if="feedback">{{feedback}}</p>
            <v-btn rounded flat outlined large class="pink" color="white" @click.prevent="signup">Create</v-btn>
        </v-card>
    </div>
</template>

<script>
    import db from '@/firebase/init'
    import slugify from 'slugify'
    import firebase from 'firebase'
    export default {
        name: 'Signup',
        data() {
            return {
            Email: null,
            Password: null,
            Username: null,
            feedback: null,
            slug: null
            }
        },
        methods: {
            signup(){
                if(this.Username && this.Email && this.Password){
                    this.slug = slugify(this.Username, {
                        replacement: '-',
                        remove: /[*+~.()'"!:@]/g,
                        lower: true
                    })
                    let ref = db.collection('users').doc(this.slug)
                    ref.get().then(doc => {
                        if(doc.exists){
                            this.feedback = 'This username already exists'
                        } else {
                            firebase.auth().createUserWithEmailAndPassword(this.Email, this.Password)
                            .then(cred => {
                                ref.set({
                                    Username: this.Username,
                                    user_id: cred.user.uid
                                })
                            }).then(()=>{
                                this.$router.push({name: 'Home'})
                            })
                            .catch(err => {
                                console.log(err)
                                this.feedback = err.message
                            })
                            this.feedback = 'This username is avalible'
                        }
                    })
                } else {
                    this.feedback = "You must fill out all fields"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

.feedback {
    text-emphasis-color: red;
}

</style>