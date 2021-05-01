<template>
  <h1>
      Home
  </h1>
  <router-view/>
  <div>
    <router-link to='/signin'>Signin</router-link><br>
    <router-link to='/live'>Live Camera</router-link>
    <button @click="requestNotification">Request Notification</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>