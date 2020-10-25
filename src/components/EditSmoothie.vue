<template>
    <v-container>
                <v-container>
                    <v-row no-gutters>
                    <v-col>
                        <div id="form" class="pa-2">
                            <div v-if="smoothie">
                                <h2>Edit {{ smoothie.title /*this.$route.params.smoothie_slug*/ }}</h2>
                            </div>
                            <v-text-field class="mt-5" label="Name your smoothie" outlined v-model="smoothie.title"></v-text-field>
                            <div class="ing_fields" v-for="(ing, index) in smoothie.ingredients" :key="index">
                                <v-text-field label="Ingredient" v-model="smoothie.ingredients[index]"></v-text-field>
                                <v-icon class="delete" large @click="deleteIng(ing)">mdi-delete-circle-outline</v-icon>
                            </div>
                            <v-text-field label="Add an ingredient" outlined @keydown.tab.prevent="addIng" v-model="another"></v-text-field>
                            <p v-if="feedback">{{feedback}}</p>
                            <v-btn color="pink" class="mr-2" dark flat block @click="EditSmoothie()">Update Smoothie</v-btn>
                        </div>
                    </v-col>
                    </v-row>
            </v-container>
        
    </v-container>
</template>

<script>
import db from '../firebase/init'
import slugify from 'slugify'

    export default {
name: 'EditSmoothie',
    data() {
        return {
            smoothie: null,
            another: null,
            feedback: null
        }
    },
methods: {
    EditSmoothie() {
        if(this.smoothie.title) {
            this.feedback = null
            // create a slug
            this.smoothie.slug = slugify(this.smoothie.title, {
                replacement: '-',
                remove: /[*+~.()'"!:@]/g,
                lower: true
            })
            db.collection('smoothies').doc(this.smoothie.id).update({
                title: this.smoothie.title,
                ingredients: this.smoothie.ingredients,
                slug: this.smoothie.slug
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
            this.smoothie.ingredients.push(this.another)
            this.another = null
            this.feedback = null
        } else {
            this.feedback = 'You must enter a value to add an ingredient'
        }
    },
    deleteIng(ing) {
        this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
            return ingredient != ing
        })
    }
},
    created(){
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then((snapshot)=>{
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
                })
            })
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