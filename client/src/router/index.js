import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BlogPage from '../views/BlogPage.vue'
import UserPage from '../views/UserPage.vue'
import SearchPage from '../views/SearchPage.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blogs/:blogSlug',
    name: 'BlogPage',
    component: BlogPage
  },
  {
    path: '/users/:userSlug',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
