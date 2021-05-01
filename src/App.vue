<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import PlantalkFirebase from './firebase'

export default {
  name: 'App',
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
  @import url('./assets/main.scss');
</style>
