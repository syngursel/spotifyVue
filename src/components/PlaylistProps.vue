<template>
  <div>
    <div class="content bg-image bg-gray-darker">
      <div class="push-50-t push-15 clearfix">

        <div class="push-15-r pull-left animated fadeIn">
          <img v-if='user.images !== undefined' class="img-avatar img-avatar96 img-avatar-thumb"
               :src="user.images[0].url">
        </div>
        <h1 class="h2 text-white push-5-t animated fadeInRight" v-if="isUserDisplayNameEmpty">{{user.id}}</h1>
        <h1 class="h2 text-white push-5-t animated fadeInRight" v-else>{{user.display_name}}</h1>
        <h2 class="h5 text-white-op animated fadeInRight">{{user.email}}</h2>
        <br/>
        <a class="btn btn-rounded btn-noborder btn-sm btn-success animated fadeInRight" :href="logout"> Logout </a>
      </div>
    </div>
    <div class="content">
      <div class="content bg-gray-darker">
        <div class="row items-push">
          <div class="col-sm-7">
            <h3 class=" text-white-op">
              Select a category
            </h3>
          </div>
          <div class="col-sm-5 text-right hidden-xs">
            <i class="si si-music-tone-alt fa-2x"></i>
          </div>
        </div>
      </div>
      <div class="content content-narrow" :if="!isCategoryEmpty">
        <div class="animated fadeInUp">
          <div class="col-xs-6 col-sm-4 col-lg-2" v-for="category in categories.items">
            <a class="block block-link-hover2 text-center" href="javascript:void(0)" @click="getPlaylists(category)">
              <div class="block-content block-content-full  bg-gray-darker">
                <img :src="category.icons[0].url" class="img-responsive">

                <div class="font-w600 text-white-op push-15-t">
                  {{category.name}}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="modal fade" id="category-playlist-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-popout">
          <div class="modal-content bg-gray-darker">
            <div class="block block-themed block-transparent remove-margin-b">
              <div class="block-header bg-primary-dark">
                <h3 class="block-title">{{selectedCategory.name}} Playlists</h3>
              </div>
              <div class="block-content">
                <!--<input class="js-rangeslider" type="text" value="81" data-min="27" data-max="513" data-step="27">-->
                <button class="btn btn-success btn-block btn-rounded push-10" type="button" @click="createPlaylist">
                  Create new playlist with the following playlists
                </button>
                <div>
                  <table class="js-table-checkable table-responsive table table-hover text-white-op table-vcenter">
                    <thead>
                    <tr>
                      <!--<th class="text-center">
                                                  <label class="css-input css-checkbox css-checkbox-sm css-checkbox-success remove-margin-t remove-margin-b">
                                                      <input type="checkbox" @click="tablePlaylistAllSelect"><span></span>
                                                  </label>
                                              </th>-->
                      <th>Name</th>
                      <th></th>
                      <th class="text-center">Creator</th>
                      <th class="text-center"><i class="si si-music-tone"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="playlist in playlists.items" :key="playlist.id" @click="selectedPlaylist(playlist)"
                        :class="{active: tablePlaylistSelected(playlist)}">
                      <!--<td class="text-center">
                                                  <label class="css-input css-checkbox css-checkbox-sm css-checkbox-success">
                                                      <input type="checkbox" :id="playlist.id" :name="playlist.id" :checked="tablePlaylistSelected(playlist)"><span></span>
                                                  </label>
                                              </td>-->
                      <td>
                        <strong>{{playlist.name}}</strong>
                      </td>
                      <td class="hidden-xs">
                      </td>
                      <td class="text-center">
													<span class="label label-info" v-if="playlist.owner.display_name !== null">
														{{playlist.owner.display_name}}
													</span>
                      </td>
                      <td class="text-center">
													<span class="label label-danger">
														<strong>{{playlist.tracks.total}} </strong>
													</span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-sm btn-default" type="button" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tracks: [],
        categories: [],
        //selectedCategories: [],
        selectedCategory: {},
        playlists: [],
        playlistTracks: [],
        selectedPlaylists: [],
        user: {},
        accessToken: ""
      }
    },
    created() {
      //this.getCategories();
    },
    mounted() {
      if (localStorage.getItem('user')) {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
      if (localStorage.getItem('accessToken')) {
        this.accessToken = localStorage.getItem('accessToken');
        this.getCategories();
      }
    },
    computed: {
      isPlaylistEmpty: function () {
        return this.playlists.length === 0;
      },
      isCategoryEmpty: function () {
        return this.categories === undefined;
      },
      isUserDisplayNameEmpty: function () {
        return this.user.display_name === null;
      },
      logout: function () {
        return "/spotifyVue";
      }
    },
    methods: {
      tablePlaylistAllSelect: function () {
        let playlist = [];
        this.selectedPlaylists = playlist.concat(this.playlists);
      },
      selectedPlaylist: function (playlist) {
        if (!this.selectedPlaylists.includes(playlist)) {
          this.selectedPlaylists.push(playlist);
        } else {
          let index = this.selectedPlaylists.indexOf(playlist);
          this.selectedPlaylists.splice(index, 1);
        }
        console.log(playlist.name);
      },
      tablePlaylistSelected: function (playlist) {
        return this.selectedPlaylists.includes(playlist);
      },
      getCategories: function () {
        fetch(`https://api.spotify.com/v1/browse/categories?limit=50`, {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        })
          .then((res) = > {return res.json()}
        )
        .
        then((res) = > {
          if(res.categories !== undefined
        )
        {
          this.categories = res.categories;
          //App.loader("hide");
        }
        else
        {
          swal('Oops...', "Something went wrong!", 'error');
        }
      })
        ;
      },
      getUserPlaylist: function () {
        fetch(`https://api.spotify.com/v1/users/${this.user.id}/playlists`, {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        })
          .then((res) = > {return res.json()}
        )
        .
        then((res) = > {
          console.log(res);
      })
        ;
      },
      getPlaylists: function (category) {
        App.loader("show");
        this.playlists = [];
        this.selectedCategory = category;
        fetch(`https://api.spotify.com/v1/browse/categories/${category.id}/playlists?limit=50`, {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        })
          .then((res) = > {return res.json()}
        )
        .
        then((res) = > {
          App.loader("hide");
        if (res.error !== undefined) {
          swal('Oops...', "This list doesn't exist!", 'error');
        } else {
          $('#category-playlist-modal').modal("toggle");
          this.playlists = res.playlists;
        }
      })
        ;
      },
      getTracks: function (playlistId) {
        return fetch(`https://api.spotify.com/v1/users/${this.user.id}/playlists/${playlistId}/tracks`, {
            headers: {
              'Authorization': 'Bearer ' + this.accessToken
            }
          })
            .then((res) = > {
            return res.json();
      })
        ;
      },
      createPlaylist: function () {
        App.loader("show");
        fetch(`https://api.spotify.com/v1/users/${this.user.id}/playlists`, {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            "name": "Ultimate " + this.selectedCategory.name + " Playlist",
            "description": "Created by Ultimate Playlist Creator - Creator Gürsel Gazi İçtüzer",
            "public": false
          }),
          method: "POST"
        })
          .then((res) = > {
          return res.json();
      })
        .
        then((res) = > {
          if(res.error === undefined
        )
        {
          this.prepareTracks(res.id);
        }
        else
        {
          App.loader("hide");
          swal('Oops...', 'Something went wrong!', 'error');
        }
      })
        ;
      },
      prepareTracks: function (playlistId) {
        this.playlistTracks = [];
        //for döngüsü bitip listeler sırada beklediği için count kullanıldı içinde
        let count = 0;
        const numberOfTracks = Math.floor(100 / this.playlists.items.length);
        for (var i = 0; i < this.playlists.items.length; i++) {
          let playlist = this.playlists.items[i];
          this.getTracks(playlist.id)
            .then((res) = > {
            count++;
          if (res.error === undefined) {
            this.tracks = res.items;
            let trackNumbers = [];
            while (true) {
              let trackNumber = Math.floor(Math.random() * this.tracks.length);
              if (trackNumbers.includes(trackNumber)) {
                continue;
              } else {
                if (!this.playlistTracks.includes(this.tracks[trackNumber].track.uri)) {
                  if (numberOfTracks === trackNumbers.length) {
                    break;
                  } else {
                    this.playlistTracks.push(this.tracks[trackNumber].track.uri);
                    trackNumbers.push(trackNumber);
                  }
                } else continue;
              }
            }
            if (count >= this.playlists.items.length) {
              this.postTracksToPlaylist(playlistId);
            }
          } else {
            //App.loader("hide");
            //swal('Oops...', 'Something went wrong!', 'error');
          }
        })
          ;
        }
      },
      postTracksToPlaylist: function (playlistId) {
        fetch(`https://api.spotify.com/v1/users/${this.user.id}/playlists/${playlistId}/tracks`, {
          headers: {
            'Authorization': 'Bearer ' + this.accessToken,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            "uris": this.playlistTracks
          }),
          method: "POST"
        })
          .then((res) = > {
          App.loader("hide");
        if (res.ok) {
          swal('Success', 'Playlist successfully created!', 'success');
        } else {
          swal('Oops...', 'Something went wrong!', 'error');
        }
      })
        ;
      }
    }
  }
</script>
