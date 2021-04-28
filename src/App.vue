<template>
  <div class="container">
    <h1>Plantalk</h1>
    <router-view/>
    <div>
      <router-link to='/signin'>Signin</router-link><br>
      <router-link to='/live'>Live Camera</router-link>
    </div>
  </div>
</template>

<script>
import LiveCamera from './views/LiveCamera.vue'

export default {
  name: 'App',
  components: {
    LiveCamera
  }
}
</script>

<style>
  @import url('./assets/main.css');
</style>
