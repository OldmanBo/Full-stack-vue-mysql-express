<template>
  <div class="error_msg_container">
    <h1>{{ msg }}</h1>
    <router-link class="back_home_btn" :to="{ name: 'Home' }"
      >Back to home</router-link
    >
  </div>
</template>

<script>
export default {
  props: ["msg"],
};
</script>

<style>
.error_msg_container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 180px);
}
.back_home_btn {
  display: inline-block;
  width: 80px;
  padding: 10px;
  border-radius: 25%;
  background: chocolate;
}
</style>