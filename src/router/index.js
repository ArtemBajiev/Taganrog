import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import PlacesPage from '@/pages/PlacesPage.vue'
import PlaceItem from '@/pages/PlaceItem.vue'
import PlaceAdmin from '@/pages/admin/PlaceAdmin.vue'
import { useStore } from '@/stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/places/:id/:type',
      name: 'places',
      component: PlacesPage
    },
    {
      path: '/places/:id',
      name: 'place',
      component: PlaceItem
    },
    {
      path: '/admin-place/:id',
      name: 'admin-place',
      component: PlaceAdmin,
      meta: { isAdmin: 1 }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const store = useStore()
  const requireAuth = to.matched.some((record) => record.meta.isAdmin)
  if ((store.isAdmin == false || store.isAdmin == undefined) && requireAuth) {
    next('/')
  } else {
    next()
  }
})
export default router
