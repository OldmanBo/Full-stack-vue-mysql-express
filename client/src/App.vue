<template>
  <div id="app">
    <Header
      :activeUserID="activeUser.user_id"
      :activeUserStatus="activeUser.status"
    />
    <router-view :key="$route.path" />
    <div class="bg_overlay">
      <!-- full top -->
      <div class="bg_blob fl ft"></div>
      <div class="bg_blob fl ft"></div>
      <div class="bg_blob fl ft"></div>
      <div class="bg_blob fl ft"></div>
      <div class="bg_blob fl ft"></div>
      <div class="bg_blob ml ft"></div>
      <div class="bg_blob ml ft"></div>
      <div class="bg_blob ml ft"></div>
      <div class="bg_blob ml ft"></div>
      <div class="bg_blob ml ft"></div>
      <div class="bg_blob mr ft"></div>
      <div class="bg_blob mr ft"></div>
      <div class="bg_blob mr ft"></div>
      <div class="bg_blob mr ft"></div>
      <div class="bg_blob mr ft"></div>
      <div class="bg_blob fr ft"></div>
      <div class="bg_blob fr ft"></div>
      <div class="bg_blob fr ft"></div>
      <div class="bg_blob fr ft"></div>
      <div class="bg_blob fr ft"></div>
      <!-- mid top -->
      <div class="bg_blob fl mt"></div>
      <div class="bg_blob fl mt"></div>
      <div class="bg_blob fl mt"></div>
      <div class="bg_blob fl mt"></div>
      <div class="bg_blob fl mt"></div>
      <div class="bg_blob ml mt"></div>
      <div class="bg_blob ml mt"></div>
      <div class="bg_blob ml mt"></div>
      <div class="bg_blob ml mt"></div>
      <div class="bg_blob ml mt"></div>
      <div class="bg_blob mr mt"></div>
      <div class="bg_blob mr mt"></div>
      <div class="bg_blob mr mt"></div>
      <div class="bg_blob mr mt"></div>
      <div class="bg_blob mr mt"></div>
      <div class="bg_blob fr mt"></div>
      <div class="bg_blob fr mt"></div>
      <div class="bg_blob fr mt"></div>
      <div class="bg_blob fr mt"></div>
      <div class="bg_blob fr mt"></div>
      <!-- mid bot -->
      <div class="bg_blob fl mb"></div>
      <div class="bg_blob fl mb"></div>
      <div class="bg_blob fl mb"></div>
      <div class="bg_blob fl mb"></div>
      <div class="bg_blob fl mb"></div>
      <div class="bg_blob ml mb"></div>
      <div class="bg_blob ml mb"></div>
      <div class="bg_blob ml mb"></div>
      <div class="bg_blob ml mb"></div>
      <div class="bg_blob ml mb"></div>
      <div class="bg_blob mr mb"></div>
      <div class="bg_blob mr mb"></div>
      <div class="bg_blob mr mb"></div>
      <div class="bg_blob mr mb"></div>
      <div class="bg_blob mr mb"></div>
      <div class="bg_blob fr mb"></div>
      <div class="bg_blob fr mb"></div>
      <div class="bg_blob fr mb"></div>
      <div class="bg_blob fr mb"></div>
      <div class="bg_blob fr mb"></div>
      <!-- full bot -->
      <div class="bg_blob fl fb"></div>
      <div class="bg_blob fl fb"></div>
      <div class="bg_blob fl fb"></div>
      <div class="bg_blob fl fb"></div>
      <div class="bg_blob fl fb"></div>
      <div class="bg_blob ml fb"></div>
      <div class="bg_blob ml fb"></div>
      <div class="bg_blob ml fb"></div>
      <div class="bg_blob ml fb"></div>
      <div class="bg_blob ml fb"></div>
      <div class="bg_blob mr fb"></div>
      <div class="bg_blob mr fb"></div>
      <div class="bg_blob mr fb"></div>
      <div class="bg_blob mr fb"></div>
      <div class="bg_blob mr fb"></div>
      <div class="bg_blob fr fb"></div>
      <div class="bg_blob fr fb"></div>
      <div class="bg_blob fr fb"></div>
      <div class="bg_blob fr fb"></div>
      <div class="bg_blob fr fb"></div>
    </div>
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
        this.activeUser.status = res.data.user.logedIn;
        this.activeUser.user_id = res.data.user.user_id;
        this.$store.commit("setActiveUser", res.data.user);
      })
      .catch((err) => {
        if (err.response) {
          this.activeUser.status = err.response.data.user.logedIn;
          this.activeUser.user_id = "";
          this.$store.commit("setActiveUser", err.response.data.user);
        } else {
          console.log(err);
        }
      });
  },
  mounted() {
    console.log(_.random(0, 5));
    //position for bg blobs
    const blobs = document.querySelectorAll(".bg_blob");
    blobs.forEach((blob) => {
      const blobSize = _.random(25, 160);
      blob.style.width = `${blobSize}px`;
      blob.style.height = `${blobSize}px`;

      let blobLight = blobSize * 0.2;
      blob.style.background = `radial-gradient( circle, hsl(280, 97%, 63%) 0%, hsl(262, 79%, ${blobLight}%) 100% )`;

      blob.style.boxShadow = `0 0 ${blobSize * 0.9}px ${
        blobSize * 0.4
      }px hsl(280, 97% ${blobLight * 1.5}%)`;

      let random_boolean = Math.random() < 0.5;
      if (random_boolean) {
        blob.style.animationDirection = "reverse";
      }

      const animationDuration = blobSize / 90 + 8;
      blob.style.animationDuartion = animationDuration + "s";

      if (blob.classList.contains("ft")) {
        const top = _.random(0, 25);
        blob.style.top = `${top}%`;
        return;
      }
      if (blob.classList.contains("mt")) {
        const top = _.random(25, 50);
        blob.style.top = `${top}%`;
        return;
      }
      if (blob.classList.contains("mb")) {
        const top = _.random(50, 75);
        blob.style.top = `${top}%`;
        return;
      }
      if (blob.classList.contains("fb")) {
        const top = _.random(75, 100);
        blob.style.top = `${top}%`;
        return;
      }
    });
    blobs.forEach((blob) => {
      const blobSize = _.random(25, 160);
      blob.style.width = `${blobSize}px`;
      blob.style.height = `${blobSize}px`;

      let blobLight = blobSize * 0.2;
      blob.style.background = `radial-gradient( circle, hsl(280, 97%, 63%) 0%, hsl(262, 79%, ${blobLight}%) 100% )`;
      blob.style.boxShadow = `0 0 ${blobSize * 0.9}px ${
        blobSize * 0.4
      }px hsl(280, 97% ${blobLight * 1.5}%)`;

      let random_boolean = Math.random() < 0.5;
      if (random_boolean) {
        blob.style.animationDirection = "reverse";
      }
      const animationDuration = blobSize / 90 + 8;
      blob.style.animationDuartion = animationDuration + "s";

      if (blob.classList.contains("fl")) {
        const left = _.random(0, 25);
        blob.style.left = `${left}%`;
        return;
      }
      if (blob.classList.contains("ml")) {
        const left = _.random(25, 50);
        blob.style.left = `${left}%`;
        return;
      }
      if (blob.classList.contains("mr")) {
        const left = _.random(50, 75);
        blob.style.left = `${left}%`;
        return;
      }
      if (blob.classList.contains("fr")) {
        const left = _.random(75, 100);
        blob.style.left = `${left}%`;
        return;
      }
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap");
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
  font-family: "Rajdhani", sans-serif;
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

.bg_overlay {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: hsl(280, 97%, 63%);
  background: radial-gradient(
    circle,
    hsla(280, 97%, 63%, 0.28) 0%,
    hsl(262, 100%, 56%) 100%
  );
}
.bg_blob {
  height: 20px;
  width: 20px;
  border-radius: 100%;
  /* background-color: hsl(262, 79%, 24%); */
  /* background: radial-gradient(
    circle,
    hsl(262, 79%, 24%) 0%,
    hsla(299, 79%, 24%, 0.815) 50%,
    hsl(262, 79%, 24%) 100%
  ); */
  background: hsl(280, 97%, 63%);
  background: radial-gradient(
    circle,
    hsl(280, 97%, 63%) 0%,
    hsl(262, 79%, 24%) 100%
  );
  box-shadow: 0 0 50px hsl(262, 79%, 24%);
  position: absolute;
  border: none;
  mix-blend-mode: hard-light;
  animation-name: blobShake;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 11s;
}
@keyframes blobShake {
  0% {
    transform: rotate(0deg) translateX(10px) translateY(4px) rotate(0deg)
      scale(1);
    filter: brightness(110%);
  }
  50% {
    transform: rotate(180deg) translateX(10px) translateY(4px) rotate(-220deg)
      scale(0.85);
    filter: brightness(80%);
  }
  100% {
    transform: rotate(360deg) translateX(10px) translateY(4px) rotate(-360deg)
      scale(1);
    filter: brightness(110%);
  }
}
</style>
