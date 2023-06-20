import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      meta: { body: ":class='theme'" },
      component:  () => import('../views/PokedexView.vue')
    },
    {
      path: '/pokedex/:pokeId',
      name: 'pokemon',
      props:  true,
      component:  () => import('../views/PokemonView.vue')
    }
  ]
})

export default router
