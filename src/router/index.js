import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddSmoothie from '../components/AddSmoothie.vue'
import Editsmoothie from '../components/EditSmoothie'
import Signup from '../components/auth/Signup.vue'
import Login from '../components/auth/Login.vue'
//import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

