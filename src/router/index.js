import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddSmoothie from '../components/AddSmoothie.vue'
import Editsmoothie from '../components/EditSmoothie'
import Signup from '../components/auth/Signup.vue'
import Login from '../components/auth/Login.vue'

import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/AddSmoothie',
    name: 'AddSmoothie',
    component: AddSmoothie
  },
  {
    path: '/edit-smoothie/:smoothie_slug',
    name: 'Editsmoothie',
    component: Editsmoothie
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
]
});

router.beforeEach((to, from, next) =>{
  // check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser
    if(user){
      // user signed in proceed to route
      next()
    } else {
      // no user signed in redirect to login
      next({name: 'Login'})
    }
  } else {
    next()
  }
});

export default router

