import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/movie',
    name: 'Movie',
    component: () => import(/* webpackChunkName: "movie" */ '../views/Movie'),
    children: [
      {
        path: 'city',
        component: () => import('@/components/movies/City'),
      },
      {
        path: 'nowShowing',
        component: () => import('@/components/movies/NowShowing'),
      },
      {
        path: 'comingSoon',
        component: () => import('@/components/movies/ComingSoon'),
      },
      {
        path: 'search',
        component: () => import('@/components/movies/Search'),
      },
      {
        path: 'detail/:movieId',
        components: {
          detail: () => import('@/views/Detail'),
        },
        props: {
          detail: true
        }
      },
      {
        path: '/movie',
        redirect: '/movie/nowShowing',
      }
    ]
  },
  {
    path: '/cinema',
    name: 'Cinema',
    component: () => import('@/views/Cinema'),
    children: [
      {
        path: 'wholeCity',
        component: () => import('@/components/cinema/CiList'),
      },
    ]
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/views/Mine')
  },
  {
    path: '/*',
    redirect: '/movie',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, //
  routes
})

export default router
