<template>
  <div id="app">
    <Header
      :activeUserID="activeUser.user_id"
      :activeUserStatus="activeUser.status"
    />
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import axios from "axios";
import Header from "./components/Header.vue";

export default {
  components: { Header },
  data() {
    return {
      activeUser: {
        status: false,
        user_id: "",
      },
      computed: {},
    };
  },
  beforeCreate() {
    const url = process.env.VUE_APP_BASE_API_URL;
    axios
      .get(`${url}auth/usercheck`, { withCredentials: true })
      .then((res) => {
        // console.log("data");
        // console.log(res.data.user);
        this.activeUser.status = res.data.user.logedIn;
        this.activeUser.user_id = res.data.user.user_id;
        this.$store.commit("setActiveUser", res.data.user);
      })
      .catch((err) => {
        if (err.response) {
          // console.log("BefoerCreated");
          // console.log(err.response.data);
          this.activeUser.status = err.response.data.user.logedIn;
          this.activeUser.user_id = "";
          this.$store.commit("setActiveUser", err.response.data.user);
        } else {
          console.log(err);
        }
      });
  },
};
</script>

<style>
:root {
  --lvl1-pink: #e5e0fa;
  --lvl1-purple: #905bec;
  --lvl2-purple: #5a18c9;
  --lvl3-purple: #300d6e;
  --lvl4-purple: #190934;
  --lvl1-yellow: #e3f7d4;
  --text-color: #190934;
  --fontH1: 4.209rem;
  --fontH2: 3.157rem;
  --fontH3: 2.369rem;
  --fontH4: 1.77rem;
  --fontTextBig: 1.33rem;
  --fontTextMedium: 1rem;
  --fontTextSmall: 0.75rem;
  --fontTextXSmall: 0.563rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
</style>
