import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
const Login = () => System.import('@/components/login')
const Index = () => System.import('@/components/index')
const Register = () => System.import('@/components/register')
const Newarticle = () => System.import('@/components/index/newarticle')
const List = () => System.import('@/components/index/list')
const ARTDetail = () => System.import('@/components/index/articleDetail')
const UpdateArt = () => System.import('@/components/index/updateArt')
const Seting = () => System.import('@/components/index/set')
const Tag = () => System.import('@/components/index/tag')
const Search = () => System.import('@/components/index/search')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index,
      redirect: {name: 'List'},
      meta: { needLogin: true },
      children: [
        {
          path: '/index/newarticle',
          name: 'Newarticle',
          component: Newarticle,
          meta: { needLogin: true },
        },
        {
          path: '/index/list',
          name: 'List',
          component: List,
          meta: { needLogin: true },
        },
        {
          path: '/index/articleDetail',
          name: 'ARTDetail',
          component: ARTDetail,
          meta: { needLogin: true },
        },
        {
          path: '/index/updateArt',
          name: 'UpdateArt',
          component: UpdateArt,
          meta: { needLogin: true },
        },
        {
          path: '/index/set',
          name: 'Seting',
          component: Seting,
          meta: { needLogin: true },
        },
        {
          path: '/index/tag',
          name: 'Tag',
          component: Tag,
          meta: { needLogin: true },
        },
        {
          path: '/index/search',
          name: 'Search',
          component: Search,
          meta: { needLogin: true },
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { needLogin: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { needLogin: false }
    }
  ]
})
