import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Auth from '@okta/okta-vue';
import { createProvider } from './vue-apollo';
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

Vue.use(BootstrapVue);

Vue.use(Auth, {
  issuer: 'https://dev-322018.oktapreview.com/oauth2/default',
  client_id: '0oaj1ntwqaajDQ3Ih0h7',
  redirect_uri: 'http://localhost:8080/implicit/callback'
});

const authMiddleware = setContext(() =>
  Vue.prototype.$auth.getAccessToken().then((token) => {
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  })
);

new Vue({
  router,
  apolloProvider: createProvider({
    link: authMiddleware.concat(createHttpLink({uri: 'http://localhost:8081/graphql'}))
  }),
  render: h => h(App)
}).$mount('#app');
