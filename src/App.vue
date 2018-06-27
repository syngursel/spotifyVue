<template>
  <div id="app">
    <main>
      <div>
        <!--<connect-spotify></connect-spotify>-->
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  import ConnectSpotify from './components/ConnectSpotify.vue'
  export default {
    name: 'app',
    components: {ConnectSpotify},
    data () {
      return {
        creator: 'Gürsel Gazi İçtüzer'
      }
    }
  }
</script>