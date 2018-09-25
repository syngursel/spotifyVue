<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: 'Callback',
    data () {
      return {
        accessToken: '',
        tokenTime: 0
      }
    },
    created() {
      console.log("callback")
      if(window.location.hash !== ""){
        this.accessToken = window.location.hash.split('&')[0].split("#access_token=")[1];
        this.tokenTime = window.location.hash.split('&')[2].split("expires_in=")[1];
        //console.log(window.location.hash.split('&')[0].split("#access_token=")[1]);
        this.getUserData();
      } else {
        this.$router.push('/');
      }
    },
    methods: {
      getUserData: function() {
        fetch("https://api.spotify.com/v1/me",{
          headers: {
            'Authorization': 'Bearer ' + this.accessToken
          }
        })
        .then((res) => { return res.json() })
        .then((res) => {
          this.setAuth(JSON.stringify(res), this.accessToken, this.tokenTime);
          //this.$refs.playlistProps.getCategories();
          this.$router.push('/playlist');
        });
      },
      setAuth: function(user, accessToken, tokenTime) {
        localStorage.setItem("user", user);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("tokenTime", tokenTime);
      }
    }
  }
</script>