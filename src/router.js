import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NodeDetail from './views/NodeDetail';
import MyVoteDetail from './views/MyVoteDetail';
import Callback from './views/Callback';


Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true
      }

    },
    {
      path: '/node_detail/:id',
      name : 'node_detail',
      component : NodeDetail
    },
    {
      path : '/vote_detail/:id',
      name : 'vote_detail',
      component : MyVoteDetail
    },
    {
      path : '/return_url',
      name : 'return_url',
      component : Callback
    }
  ]
})
