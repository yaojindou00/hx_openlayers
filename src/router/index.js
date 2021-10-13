import { createRouter, createWebHashHistory } from 'vue-router'
import MapContent from '../views/mapview/MapContent.vue'

const routes = [
  {
    path: '/',
    name: 'MapContent',
    component: MapContent
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
