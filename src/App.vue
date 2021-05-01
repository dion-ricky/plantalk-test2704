<template>
  <div class="container">
    <h1>Plantalk</h1>
    <router-view/>
    <div>
      <router-link to='/signin'>Signin</router-link><br>
      <router-link to='/live'>Live Camera</router-link>
      <button @click="requestNotification">Request Notification</button>
    </div>
  </div>
</template>

<script>
import LiveCamera from './views/LiveCamera.vue'
import PlantalkFirebase from './firebase'

export default {
  name: 'App',
  components: {
    LiveCamera
  },
  methods: {
    requestNotification() {
      const messaging = PlantalkFirebase.getMessaging();
      messaging.requestNotification();
    }
  },
  created() {
    const messaging = PlantalkFirebase.getMessaging();
    messaging.setOnMessageHandler((payload) => {
      console.log(payload);
    });
  }
}
</script>

<style>
  @import url('./assets/main.css');
</style>
