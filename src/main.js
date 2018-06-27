import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import App from './App.vue'
import Callback from './components/Callback.vue'
import ConnectSpotify from './components/ConnectSpotify.vue'
import PlaylistProps from './components/PlaylistProps.vue'

const router = new VueRouter({
	routes: [
	{ path: '/', component: ConnectSpotify, name: 'connectSpotify' },
	{ path: '/playlist', component: PlaylistProps, name: 'playlistProps' },
	{ path: '/callback', component: Callback, name: 'callback' }
	],
	mode: 'history'
});

router.beforeEach(function (to, from, next) {
	if (to.path === '/playlist') {
		if(localStorage.getItem("accessToken")){
			next();
		} else {
			next("/");
		}
	} else {
		next();
	}
});

new Vue({
	el: '#app',
	render: h => h(App),
	router
})
