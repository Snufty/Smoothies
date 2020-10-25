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

      <router-link :to="{name: 'AddSmoothie'}">
        <v-btn fab color="pink" class="mr-7" absolute right bottom>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>

    </v-toolbar>
  </div>
</template>

<script>
  export default {

}
</script>

<style lang="scss" scoped>
.link{
  text-decoration: none;
  color: white;
}
</style>