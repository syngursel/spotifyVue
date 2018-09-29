import Vue from './theme/vue-js/vue.js'
import VueRouter from './theme/vue-js/vue-router.js'

Vue.use(VueRouter);

import App from './App.vue'
import Callback from './components/Callback.vue'
import ConnectSpotify from './components/ConnectSpotify.vue'
import PlaylistProps from './components/PlaylistProps.vue'

const router = new VueRouter({
  routes: [
    {path: '/', component: ConnectSpotify, name: 'connectSpotify'},
    {path: '/playlist', component: PlaylistProps, name: 'playlistProps'},
    {path: '/callback', component: Callback, name: 'callback'}
  ],
  mode: 'hash'
});

router.beforeEach(function (to, from, next) {
  if (to.path === '/playlist') {
    if (localStorage.getItem("accessToken")) {
      next();
    } else {
      next("/");
    }
  } else {
    if (to.path.includes('/access_token')) {

      localStorage.setItem("accessToken", window.location.hash.split('&')[0].split("#/access_token=")[1]);
      localStorage.setItem("tokenTime", window.location.hash.split('&')[2].split("expires_in=")[1]);
      fetch("https://api.spotify.com/v1/me", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res));
          next("/playlist");
        });

    } else {
      next();
    }
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
