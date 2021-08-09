<template>
  <div class="user_container">
    <section class="user_details">
      <div class="img_contianer">
        <img :src="userImg" alt="" />
      </div>
      <div class="about_me_container">
        <p><span>User Name:</span> {{ userName }}</p>
        <p><span>First Name:</span> {{ userFirstName }}</p>
        <p><span>Last Name:</span> {{ userLastName }}</p>
        <p><span>Email:</span> {{ userEmail }}</p>
        <p><span>Date of birth:</span> {{ userBirthDay }}</p>
        <p><span>Phone Number:</span> {{ userPhoneNum }}</p>
        <p class="user_bio"><span>User Bio:</span> {{ userBio }}</p>
      </div>
      <button
        class="edit_user_btn"
        v-if="editUserBtn"
        @click="openUserEdit(userToEdit)"
      >
        EDIT USER
      </button>
    </section>

    <div class="update_user_modal" v-if="updateUserModal">
      <form
        class="update_user_form"
        id="update_user_form"
        name="update_user_form"
      >
        <div class="form_group">
          <label for="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="axiosUserData.email"
          />
        </div>
        <div class="form_group">
          <label for="user_name">User Name: </label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            v-model="axiosUserData.user_name"
          />
        </div>
        <div class="form_group">
          <label for="first_name">First Name: </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            v-model="axiosUserData.first_name"
          />
        </div>
        <div class="form_group">
          <label for="last_name">Last Name: </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            v-model="axiosUserData.last_name"
          />
        </div>
        <div class="form_group">
          <label for="birth_date">Date of Birth: </label>
          <input
            type="text"
            name="birth_date"
            id="birth_date"
            v-model="axiosUserData.birth_date"
          />
        </div>
        <div class="form_group">
          <label for="phone_number">Phone Number: </label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            v-model="axiosUserData.phone_number"
          />
        </div>
        <div class="form_group">
          <label for="bio">Bio: </label>
          <input type="text" name="bio" id="bio" v-model="axiosUserData.bio" />
        </div>
        <button type="" @click.prevent="editUser">EDIT</button>
        <p class="error_msg" v-if="userErrormsg">{{ userErrormsg }}</p>
        <p class="closeLogin" @click="updateUserModal = false">Go Back</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const qs = require("qs");
export default {
  props: [
    "userName",
    "userFirstName",
    "userLastName",
    "userEmail",
    "userBirthDay",
    "userPhoneNum",
    "userBio",
    "userImg",
    "editUserBtn",
    "userToEdit",
  ],
  data() {
    return {
      updateUserModal: false,
      userToBeEdited: null,
      axiosUserData: {
        email: "",
        user_name: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        phone_number: "",
        bio: "",
      },
      userErrormsg: "",
      url: process.env.VUE_APP_BASE_API_URL,
    };
  },
  methods: {
    openUserEdit(userToEdit) {
      this.updateUserModal = true;
      this.userToBeEdited = userToEdit;
      this.axiosUserData.email = this.userToBeEdited.email;
      this.axiosUserData.user_name = this.userToBeEdited.user_name;
      this.axiosUserData.first_name = this.userToBeEdited.first_name;
      this.axiosUserData.last_name = this.userToBeEdited.last_name;
      this.axiosUserData.birth_date = this.userToBeEdited.birth_date;
      this.axiosUserData.phone_number = this.userToBeEdited.phone_number;
      this.axiosUserData.bio = this.userToBeEdited.bio;
    },
    editUser() {
      axios
        .put(
          `${this.url}users/${this.userToBeEdited.user_id}`,
          this.axiosUserData,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          this.$router.go();
        })
        .catch((err) => {
          if (err.response) {
            this.userErrormsg = err.response.data.msg;
            console.log(err.response);
            console.log(err.response.data.msg);
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
.user_container {
  width: 100%;
  max-width: 800px;
}
.user_details {
  display: flex;
  margin-bottom: 30px;
  padding: 10px;
  border: 1px solid grey;
  background: var(--lvl2-purple);
}
.img_contianer {
  margin: 0 15px;
  max-width: 250px;
  max-height: 250px;
  border: 2px solid var(--lvl3-purple);
}
.img_contianer img {
  width: 100%;
  height: 100%;
}
.about_me_container p {
  margin: 5px 0;
  color: var(--lvl1-pink);
}
.about_me_container span {
  font-weight: bold;
  opacity: 0.8;
}
.user_details button {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-weight: bold;
  cursor: pointer;
  background-color: var(--lvl4-purple);
  border-radius: 5px;
  color: var(--lvl1-pink);
  transition: background-color 150ms ease-in;
  margin-left: auto;
}
.user_details button:hover {
  background-color: #000000;
}
.user_bio {
  max-width: 70ch;
}

.update_user_modal {
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
.update_user_form {
  background: var(--lvl3-purple);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--fontTextMedium);
  padding: 50px;
  width: 80%;
  max-width: 780px;
  min-width: 500px;
}
.update_user_form input {
  margin-left: auto;
  width: 60%;
}
.update_user_form label {
  color: var(--lvl1-pink);
}
.update_user_form .form_group {
  margin: 15px 0;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
}
</style>