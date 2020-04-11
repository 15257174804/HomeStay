import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import register from '../components/register'
import details from '../components/layout/details'
import Comment_content from '../components/layout/details/comment_content.vue'
import Pay from '../components/layout/details/pay.vue'
import People from '../components/layout/details/people.vue'
import Enter from '../components/layout/details/enter.vue'
import layout from '../components/layout'
import home from '../components/layout/body/pages/home'
import search from '../components/layout/body/pages/search'
import my from '../components/layout/body/pages/my'
import Hsearch from '../components/layout/body/pages/search/Hsearch'
import Scenic from '../components/layout/body/pages/home/Scenic'
import Date from '../components/layout/body/pages/home/Date'
import Story from '../components/layout/body/pages/home/Story'
import Diary from '../components/layout/body/pages/home/Diary'
import Protocol from '../components/layout/body/pages/home/Protocol'
import Plist from '../components/layout/body/pages/home/Plist'

import set from '../components/layout/body/pages/my/Set.vue'
import info from '../components/layout/body/pages/my/Info.vue'
import ordered from '../components/layout/body/pages/my/ordered.vue'
import ordering from '../components/layout/body/pages/my/ordering.vue'
import mylike from '../components/layout/body/pages/my/mylike.vue'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/detail',
      name: 'detail',
      component: details
    },
    {
      path: '/comment_content',
      name: 'comment_content',
      component: Comment_content
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/people',
      name: 'people',
      component: People
    },
    {
      path: '/enter',
      name: 'enter',
      component: Enter
    },
    {
      path: '/',
      name: 'layout',
      redirect:'/home',
      component: layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home
        },
        {
          path: '/search',
          name: 'search',
          component: search
        },
        {
          path: '/my',
          name: 'my',
          component: my
        }
      ]
    },
    {
      path: '/Hsearch',
      name: 'Hsearch',
      component: Hsearch,
    },
    {
      path: '/Scenic',
      name: 'Scenic',
      component: Scenic,
    },
    {
      path: '/Date',
      name: 'Date',
      component: Date,
    },
    {
      path: '/Diary/:img',
      name: 'Diary',
      component: Diary,
    },
    {
      path: '/Story',
      name: 'Story',
      component: Story,
    },
    {
      path: '/Protocol',
      name: 'Protocol',
      component: Protocol,
    },
    {
      path: '/Plist/:item',
      name: 'Plist',
      component: Plist,
    },

    {path:"/Set",component:set},
    {path:"/Info",component:info},
    {path:"/Myorder",component:ordered},
    {path:"/Unorder",component:ordering},
    {path:"/Mylike",component:mylike},
  ]

})
