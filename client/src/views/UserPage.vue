<template>
  <div class="user_page">
    <template v-if="user.user_name">
      <User
        :userBio="user.bio"
        :userName="user.user_name"
        :userFirstName="user.first_name"
        :userLastName="user.last_name"
        :userEmail="user.email"
        :userBirthDay="user.birth_date"
        :userPhoneNum="user.phone_number"
        :userImg="user.img"
        :editUserBtn="editUserBtn"
        :userToEdit="user"
      />
    </template>
    <form
      class="new_blog"
      :class="{ new_blog_inactive: newBlogToggle }"
      action=""
      v-if="activeUser.user_id == this.$route.params.userSlug"
    >
      <h2 @click="newBlogToggle = !newBlogToggle">Write a new blog...</h2>
      <div class="form_group">
        <label for="title">Title: </label>
        <input type="text" name="title" id="title" v-model="createBlog.title" />
      </div>
      <div class="form_group">
        <label for="body_snippet">Body snipet: </label>
        <input
          type="text"
          name="body_snippet"
          id="body_snippet"
          v-model="createBlog.body_snippet"
        />
      </div>
      <div class="form_group">
        <label for="body">Blog text: </label>
        <textarea
          name="body"
          id="body"
          cols="50"
          rows="10"
          v-model="createBlog.body"
        ></textarea>
      </div>
      <p class="error_msg" v-if="blogErrorMsg">{{ blogErrorMsg }}</p>
      <button @click.prevent="submitNewBlog">FINISH</button>
    </form>
    <template v-if="blogs.length > 0">
      <Blog
        v-for="blog in blogs"
        :key="'blogId' + blog.blog_id + blog.title"
        :blog_title="blog.title"
        :blog_writer="blog.written_by"
        :blog_date="blog.date_created"
        :blog_body="blog.body"
        :blog_snippet="blog.body_snippet"
        :blog_id="blog.blog_id"
        :userSlug="blog.user_id"
        :editBtnActive="editBtnActive"
        :blogToEdit="blog"
        :showSnippet="true"
      />
    </template>
    <div class="user_page_error_msg" v-if="errorResponse">
      <h2>{{ errorResponse }}</h2>
      <router-link :to="{ name: 'Home' }"><strong>Go back</strong></router-link>
    </div>
    <h2 v-if="blogs.length == 0 && !errorResponse">
      This user hasn't written any blogs yet
    </h2>
  </div>
</template>

<script>
import axios from "axios";
import User from "../components/User.vue";
import Blog from "../components/Blog.vue";

export default {
  components: { User, Blog },
  data() {
    return {
      url: process.env.VUE_APP_BASE_API_URL,
      user: {},
      activeUser: {
        status: false,
        user_id: "",
      },
      blogs: [],
      errorResponse: null,
      editBtnActive: false,
      editUserBtn: false,
      createBlog: {
        title: "",
        body_snippet: "",
        body: "",
      },
      newBlogToggle: true,
      blogErrorMsg: "",
    };
  },
  methods: {
    submitNewBlog() {
      axios
        .post(`${this.url}blogs`, this.createBlog, { withCredentials: true })
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((err) => {
          if (err.response) {
            this.blogErrorMsg = err.response.data.msg;
            console.log(err.response);
            console.log(err.response.data.msg);
          } else {
            console.log(err);
          }
        });
    },
  },
  created() {
    const userID = this.$route.params.userSlug;
    axios
      .get(`${this.url}users/${userID}`)
      .then((res) => {
        this.user = res.data.data;
        if (!this.user.img) {
          this.user.img = require("../assets/default_avatar.png");
        }
      })
      .then(() => {
        this.activeUser = this.$store.getters.getActiveUser;
        if (this.activeUser.user_id == this.$route.params.userSlug) {
          this.editBtnActive = true;
          this.editUserBtn = true;
        } else {
          this.editBtnActive = false;
          this.editUserBtn = false;
        }
      })
      .catch((err) => {
        if (err.response.data) {
          console.log(err.response.data);
          this.errorResponse = err.response.data.msg;
        } else {
          console.log(err);
        }
      });
    axios
      .get(`${this.url}blogs/search/${userID}`)
      .then((res) => {
        this.blogs = res.data.data;
      })
      .catch((err) => {
        if (err.response.data) {
          console.log(err.response.data);
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
.user_page {
  padding: 50px 20%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
}
.user_page .error_msg {
  text-align: center;
  margin: 5px;
}
.user_page_error_msg {
  text-align: center;
}
.user_page_error_msg a {
  margin-top: 50px;
  display: block;
  font-size: var(--fontTextBig);
}
.new_blog {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 780px;
  min-width: 500px;
  box-shadow: inset 0 0 150px #4700bf, 0 0 5px;
  color: white;
  border-radius: 5px;
  padding: 15px 10px;
  margin-bottom: 50px;
  overflow: hidden;
}
.new_blog h2 {
  margin: 10px 0 20px 0;
  text-align: center;
  cursor: pointer;
}
.new_blog label {
  margin: 10px 0 10px 0;
}
.new_blog button {
  margin: 10px auto 0 auto;
  width: 100px;
  margin-top: 30px;
  /* width: 73px;
  height: 73px; */
  padding: 10px;
  background: radial-gradient(
    circle,
    rgba(191, 69, 252, 0.95) 0%,
    rgba(27, 14, 121, 0.92) 100%
  );
  color: white;
  border: 2px solid rgba(191, 69, 252, 0.95);
  border-radius: 5px;
  font-size: var(--fontTextMedium);
  cursor: pointer;
  transition: filter 200ms ease-in-out, box-shadow 200ms ease-in-out;
  filter: brightness(80%);
}
.new_blog button:hover {
  filter: brightness(100%);
  box-shadow: 0 0 5px rgba(191, 69, 252, 0.95);
}
.new_blog .form_group {
  display: flex;
  flex-direction: column;
}
.new_blog .form_group input,
.new_blog .form_group textarea {
  border: 2px solid var(--lvl2-purple);
  border-radius: 5px;
  background: white;
}
.new_blog.new_blog_inactive {
  height: 75px;
}
</style>