<template>
	<div>
		<br/><br/>
		<div class="bg-image-frontpage">
			<div class="bg-primary-dark-op">
				<!-- Header -->
				<section class="content content-full content-boxed overflow-hidden">
					<div class="push-150-t push-150">
						<h1 class="font-s48 font-w700 text-uppercase text-white push-10 visibility-hidden text-center" data-toggle="appear" data-class="animated bounceIn">Spotify</h1>
						<h1 class="font-s48 font-w700 text-uppercase text-white push-10 visibility-hidden text-center" data-toggle="appear" data-class="animated bounceIn">Ultimate Playlist Creator</h1>
						<h2 class="h3 font-w400 text-white-op push-50 visibility-hidden text-center" data-toggle="appear" data-class="animated fadeIn" data-timeout="750">Creating playlists for your taste</h2>
					</div>
					<div class="content content-boxed">
						<div class="row text-center">
							<div class="col-md-4 col-md-offset-4">
								<button class="btn btn-success btn-block btn-rounded push-20 visibility-hidden" data-toggle="appear" data-class="animated fadeIn" data-timeout="950"  @click="loginSpotify">
									Login with Spotify
								</button>
							</div>
						</div>
					</div>
				</section>
				<!-- END Header -->

				<!-- Features -->
				<div class="bg-primary-op">
					<section class="content content-boxed">
						<div class="push-30">
							<div class="row items-push text-center">
								<div class="col-xs-4 col-md-4 visibility-hidden" data-toggle="appear" data-offset="-100" data-class="animated flipInY" data-timeout="200">
									<div class="item item-2x item-circle push-10">
										<i class="fa fa-th text-white"></i>
									</div>
									<div class="font-w600 text-white-op text-uppercase">10+ Categories</div>
								</div>
								<div class="col-xs-4 col-md-4 visibility-hidden" data-toggle="appear" data-offset="-100" data-class="animated flipInY" data-timeout="400">
									<div class="item item-2x item-circle push-10">
										<i class="fa fa-list-ul text-white"></i>
									</div>
									<div class="font-w600 text-white-op text-uppercase">100+ Playlists</div>
								</div>
								<div class="col-xs-4 col-md-4 visibility-hidden" data-toggle="appear" data-offset="-100" data-class="animated flipInY" data-timeout="600">
									<div class="item item-2x item-circle push-10">
										<i class="fa fa-music text-white"></i>
									</div>
									<div class="font-w600 text-white-op text-uppercase">1.000+ Songs</div>
								</div>
							</div>
						</div>
					</section>
				</div>
				<!-- END Features -->
			</div>
		</div>
		<footer id="page-footer" class="content-mini content-mini-full font-s12 bg-primary-dark-op clearfix">
			<div class="pull-right text-white-op">
				Created by <a class="font-w600" href="https://www.linkedin.com/in/g%C3%BCrsel-gazi-i%C3%A7t%C3%BCzer-499798a0/" target="_blank">Gürsel Gazi İçtüzer</a>
			</div>
		</footer>

	</div>
</template>

<script>
	import PlaylistProps from './PlaylistProps.vue'
	export default {
		name: "ConnectSpotify",
		components: {PlaylistProps},
		data() {
			return {
				clientId: '00eccef5ce3f415dafcaadb5f7b982f7',
				clientSecret: '2d02f275fb8f4d758c64c13efdf0f569',
				scope: 'user-read-email user-library-read user-library-modify playlist-read-private playlist-modify-public playlist-modify-private playlist-read-collaborative',
				redirectUri: window.location + 'callback/'
			}
		},
		computed: {
			routePlaylistProps(){
				return "/playlist";
			}
		},
		methods: {
			//metodları $_playlistProps_foksiyon olarak olursa daha iyi olur
			loginSpotify: function(callback) {
				const url = "https://accounts.spotify.com/authorize?response_type=token&client_id=" + this.clientId  + '&redirect_uri=' + encodeURIComponent(this.redirectUri) + "&scope=" + encodeURIComponent(this.scope);

				window.location.href = url;
			},
			logoutAuth: function() {
				localStorage.setItem("user","");
				localStorage.setItem("accessToken", "");
				localStorage.setItem("tokenTime", "");
			}
		},
		created() {
			this.logoutAuth();
		}
	}
</script>

