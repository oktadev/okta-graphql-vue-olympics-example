import Vue from 'vue'
import Router, { NavigationGuard } from 'vue-router'
import Home from './views/Home.vue'
import Olympics from './views/Olympics.vue'
import Auth from '@okta/okta-vue'

const authGuard = async function(to, from, next) {
  const authenticated = await router.app.$auth.isAuthenticated();
  if (authenticated) {
    next();
  } else {
    router.app.$auth.loginRedirect(to.path);
    next(false);
  }
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/olympics/:offset?',
      name: 'olympics',
      component: Olympics,
      beforeEnter: authGuard
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    }
  ]
});

export default router;
