<template>
<v-container>
    <v-row no-gutters>
      <v-col>
        <div id="form" class="pa-2">
            <h1>Add New Smoothie Recipe</h1>
            <v-text-field class="mt-5" label="Name your smoothie" outlined v-model="title"></v-text-field>
            <div class="ing_fields" v-for="(ing, index) in ingredients" :key="index">
                <v-text-field label="Ingredient" v-model="ingredients[index]"></v-text-field>
                <v-icon class="delete" large @click="deleteIng(ing)">mdi-delete-circle-outline</v-icon>
            </div>
            <v-text-field label="Add an ingredient" outlined @keydown.tab.prevent="addIng" v-model="another"></v-text-field>
            <p v-if="feedback">{{feedback}}</p>
            <v-btn color="pink" class="mr-2" dark flat block @click="AddSmoothie()">Add Smoothie</v-btn>
        </div>
      </v-col>
    </v-row>
</v-container>
</template>

<script>
import db from '../firebase/init'
import slugify from 'slugify'

    export default {
        name: 'AddSmoothie',
        data(){
            return{
                title: null,
                another: null,
                ingredients: [],
                feedback: null,
                slug: null
            }
        },
        methods: {
            AddSmoothie() {
                if(this.title) {
                    this.feedback = null
                    // create a slug
                    this.slug = slugify(this.title, {
                        replacement: '-',
                        remove: /[*+~.()'"!:@]/g,
                        lower: true
                    })
                    db.collection('smoothies').add({
                        title: this.title,
                        ingredients: this.ingredients,
                        slug: this.slug
                    }).then(()=>{
                        this.$router.push({name: 'Home'})
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.feedback = 'You must enter a smoothie title'
                }
            },
            addIng(){
                if(this.another) {
                    this.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                } else {
                    this.feedback = 'You must enter a value to add an ingredient'
                }
            },
            deleteIng(ing) {
                this.ingredients = this.ingredients.filter(ingredient => {
                    return ingredient != ing
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

.ing_fields {
    position: relative;
}

.delete {
   position: absolute;
   right: 0;
   top: 0;
   cursor: pointer;
}

</style>