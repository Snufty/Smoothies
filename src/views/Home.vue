<template>
      <v-row no-gutters justify="center">
        <v-col class="col" cols="12">
          <v-card class="ma-2 pa-3 d-flex flex-row card_content" shaped elevation="4" max-width="500" v-for="smoothie in smoothies" :key="smoothie.id">
            <v-btn small right absolute bottom fab color="red" @click="deleteSmoothie(smoothie.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <div class="card-content">
              <h2 class="ml-3">{{smoothie.title}}</h2>
              <ul class="ingredients ma-1">
                <li class="list" v-for="(ing, index) in smoothie.ingredients" :key="index">
                  <v-chip class="mt-1 mb-1">{{ ing }}</v-chip>
                </li>
              </ul>
            </div>
            <router-link :to="{name: 'Editsmoothie', params: {smoothie_slug: smoothie.slug}}" >
              <v-btn absolute left bottom fab small depressed color="blue">
                <v-icon>mdi-circle-edit-outline</v-icon>
              </v-btn>
            </router-link>
          </v-card>
        </v-col>
      </v-row>

</template>

<script>

import db from '../firebase/init'

export default {
  name: 'Home',
  data () {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie(id) {
      // delete doc from firestore
      db.collection('smoothies').doc(id).delete()
      .then(()=>{
        // updating front-end
        this.smoothies = this.smoothies.filter(smoothie => {
        return smoothie.id != id
        })
      })
    }
  },
  created() {
    // fetch data fra firestore
    db.collection('smoothies').get()
    .then(snapshot=> {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
  }
}
</script>

<style lang="css">

  .list {
    list-style: none;
  }

  .home {
    margin-top: 60px;
  }

   .col {
    margin-top: 40px; 
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .card_content {
    border: 2px solid black;
  }


</style>
