<template>
  <header>
    <div class="header_logo">
      <router-link class="logo" :to="{ name: 'Home' }">LOGO</router-link>
    </div>
    <nav>
      <router-link class="header_nav_link" :to="{ name: 'Home' }"
        >home</router-link
      >
      <router-link
        class="header_nav_link"
        v-if="activeUserStatus"
        :to="{ name: 'UserPage', params: { userSlug: activeUserID } }"
        >profile</router-link
      >
      <router-link class="header_nav_link" :to="{ name: 'SearchPage' }"
        >Search</router-link
      >
    </nav>
    <div class="auth_btns">
      <button
        class="auth_btn"
        v-if="activeUserStatus === false"
        @click="registerModal = true"
      >
        Register
      </button>
      <button
        class="auth_btn"
        v-if="activeUserStatus === false"
        @click="loginModal = true"
      >
        Login
      </button>
      <button
        class="auth_btn"
        v-if="activeUserStatus === true"
        @click="logoutUser"
      >
        logout
      </button>
    </div>
    <!-- User login modal -->
    <div class="login_modal" v-if="loginModal">
      <div class="login_form">
        <div class="form_group">
          <label for="email">Email: </label>
          <input type="email" name="email" id="email" v-model="mail" />
        </div>
        <div class="form_group">
          <label for="password">Password: </label>
          <input type="password" name="password" id="password" v-model="pass" />
        </div>
        <p class="error_msg" v-if="userErrormsg">{{ userErrormsg }}</p>
        <button type="" @click="loginUser">LOGIN</button>
        <p class="closeLogin" @click="loginModal = false">X</p>
      </div>
    </div>
    <!-- Register user modal -->
    <div class="register_modal" v-if="registerModal">
      <form
        class="register_form"
        id="register_user_form"
        name="register_user_form"
      >
        <div class="form_group">
          <label for="email">Email: </label>
          <input type="email" name="email" id="email" />
        </div>
        <div class="form_group">
          <label for="password">Password: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div class="form_group">
          <label for="confirmPassword">Confirm Password: </label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
        </div>
        <div class="form_group">
          <label for="user_name">User Name: </label>
          <input type="text" name="user_name" id="user_name" />
        </div>
        <div class="form_group">
          <label for="first_name">First Name: </label>
          <input type="text" name="first_name" id="first_name" />
        </div>
        <div class="form_group">
          <label for="last_name">Last Name: </label>
          <input type="text" name="last_name" id="last_name" />
        </div>
        <div class="form_group">
          <label for="birth_date">Date of Birth: </label>
          <input type="text" name="birth_date" id="birth_date" />
        </div>
        <div class="form_group">
          <label for="phone_number">Phone Number: </label>
          <input type="text" name="phone_number" id="phone_number" />
        </div>
        <div class="form_group">
          <label for="bio">Bio: </label>
          <input type="text" name="bio" id="bio" />
        </div>
        <div class="form_group">
          <label for="image">Profile Image: </label>
          <input type="file" name="image" id="image" />
        </div>
        <p class="error_msg" v-if="userErrormsg">{{ userErrormsg }}</p>
        <button type="" @click.prevent="registerUser">REGISTER</button>
        <p class="closeLogin" @click="registerModal = false">X</p>
      </form>
    </div>
  </header>
</template>

<script>
import axios from "axios";

export default {
  props: ["activeUserID", "activeUserStatus"],
  data() {
    return {
      loginModal: false,
      registerModal: false,
      mail: "",
      pass: "",
      url: process.env.VUE_APP_BASE_API_URL,
      userErrormsg: "",
    };
  },
  methods: {
    loginUser() {
      axios
        .post(
          `${this.url}auth/login`,
          { email: this.mail, password: this.pass },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          if (this.$route.name == "Home") {
            this.$router.go();
            this.loginModal = false;
          } else {
            this.$router.push({ name: "Home" });
            this.$router.go();
            this.loginModal = false;
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            this.userErrormsg = err.response.data.msg;
          } else {
            console.log(err);
          }
        });
    },
    logoutUser() {
      const url = process.env.VUE_APP_BASE_API_URL;
      axios
        .get(`${url}auth/logout`, { withCredentials: true })
        .then((res) => {
          console.log(res);
          this.$store.commit("setActiveUser", {
            logout: { status: false, user_id: "" },
          });
          if (this.$route.name == "Home") {
            this.$router.go();
          } else {
            this.$router.push({ path: "/" });
            this.$router.go();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    registerUser() {
      const registerUserForm = document.getElementById("register_user_form");
      const registerUserData = new FormData(registerUserForm);
      axios
        .post(`${this.url}auth/register`, registerUserData)
        .then((result) => {
          console.log(result);
          this.userErrormsg = "";
          this.$router.push({ path: "/" });
          this.$router.go();
        })
        .catch((err) => {
          if (err.response) {
            this.userErrormsg = err.response.data.msg;
            console.log(this.userErrormsg);
          } else {
            console.log(err);
          }
        });
    },
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
header {
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 7%;
  background: radial-gradient(
    circle,
    hsla(280, 56%, 40%, 0.8) 0%,
    hsl(262, 79%, 24%) 100%
  );
  color: var(--lvl1-pink);
  z-index: 5;
  position: relative;
}
.header_logo {
  text-align: left;
  font-size: var(--fontH3);
}
.logo {
  color: white;
  text-shadow: 0 0 10px rgb(0, 231, 255);
}
.header_logo,
.auth_btns,
nav {
  width: 100%;
}
.header_nav_link {
  color: var(--lvl1-pink);
  font-size: 1.2rem;
  text-transform: uppercase;
  text-decoration: underline;
  position: relative;
  display: inline-block;
  border-radius: 10px;
  padding: 5px;
}
.header_nav_link::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(0, 0);
  box-shadow: 0 0 6px rgb(219, 153, 252);
  background: radial-gradient(
    circle,
    rgba(191, 69, 252, 0.95) 0%,
    rgba(103, 14, 121, 0.92) 100%
  );
  transition: transform 300ms cubic-bezier(0.77, 0, 0.18, 1);
  mix-blend-mode: overlay;
  transform-origin: center;
  border-radius: 10px;
}
.header_nav_link:hover:before {
  transform: scale(1);
}
.header_nav_link + .header_nav_link {
  margin-left: 15px;
}

.auth_btns {
  text-align: right;
}
.auth_btn {
  font-size: 1.2rem;
  color: var(--lvl3-purple);
  background-color: var(--lvl1-pink);
  border: none;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  transition: box-shadow 110ms ease-in, transform 100ms ease-in,
    color 110ms ease-in;
}
.auth_btn:hover {
  box-shadow: 5px 5px 5px rgba(179, 26, 255, 0.95);
  transform: translate(-2px, -2px);
  color: rgba(179, 26, 255, 0.95);
}
.auth_btn + .auth_btn {
  margin-left: 10px;
}

.login_modal,
.register_modal {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(36, 0, 36, 0.623);
}
.login_form {
  background: var(--lvl3-purple);
  display: flex;
  position: relative;
  flex-direction: column;
  font-size: var(--fontTextBig);
  padding: 50px;
  max-width: 500px;
  min-width: 300px;
  width: 100%;
  opacity: 1;
  border-radius: 1em;
  border: 1px solid rgba(191, 69, 252, 0.95);
}
.register_form {
  background: var(--lvl3-purple);
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  font-size: var(--fontTextMedium);
  padding: 50px;
  border: 1px solid rgba(191, 69, 252, 0.95);
  border-radius: 1em;
}
.register_form button {
  margin-top: 30px;
  width: 73px;
  height: 73px;
  padding: 5px;
  background: radial-gradient(
    circle,
    rgba(191, 69, 252, 0.95) 0%,
    rgba(27, 14, 121, 0.92) 100%
  );
  color: white;
  border: 2px solid rgba(191, 69, 252, 0.95);
  border-radius: 100%;
  cursor: pointer;
  transition: filter 200ms ease-in-out, box-shadow 200ms ease-in-out;
  filter: brightness(70%);
}
.register_form button:hover {
  filter: brightness(100%);
  box-shadow: 0 0 5px rgba(191, 69, 252, 0.95);
}
.register_form input {
  margin-left: auto;
}
.register_form .form_group {
  margin: 15px 0;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
}
#image {
  margin-left: 10px;
}
.login_form .form_group {
  display: flex;
  flex-direction: column;
  margin: 15px 0;
}
.login_form input {
  font-size: var(--fontTextBig);
  padding: 4px;
}
.login_form button {
  margin-top: 40px;
  width: 60px;
  height: 60px;
  padding: 10px;
  display: block;
  margin: 40px auto 0 auto;
  background: radial-gradient(
    circle,
    rgba(191, 69, 252, 0.95) 0%,
    rgba(27, 14, 121, 0.92) 100%
  );
  color: white;
  border: 2px solid rgba(191, 69, 252, 0.95);
  border-radius: 100%;
  cursor: pointer;
  transition: filter 200ms ease-in-out, box-shadow 200ms ease-in-out;
  filter: brightness(70%);
}
.login_form button:hover {
  box-shadow: 0 0 5px rgba(191, 69, 252, 0.95);
  filter: brightness(100%);
}
.closeLogin {
  cursor: pointer;
  width: 35px;
  height: 35px;
  text-align: center;
  position: absolute;
  padding: 5px;
  border: 2px solid black;
  border-radius: 5px;
  color: var(--lvl1-pink);
  display: block;
  top: 10px;
  right: 10px;
}

.error_msg {
  width: 100%;
  color: red;
  border: 2px solid red;
}
</style>