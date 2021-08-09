<template>
  <div class="search_page">
    <form class="seacrh_form">
      <div class="form_group">
        <label for="radio_users">Users: </label>
        <input
          type="radio"
          name="search_type"
          v-model="searchType"
          value="users"
          id="radio_users"
        />
      </div>
      <div class="form_group">
        <label for="radio_blogs">Blogs: </label>
        <input
          type="radio"
          name="search_type"
          v-model="searchType"
          value="blogs"
          id="radio_blogs"
        />
      </div>
      <div class="form_group">
        <label for="searchLimit">Results per page: </label>
        <select name="limit" v-model="searchLimit" id="searchLimit">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div class="form_group">
        <label for="searchBar">Search term: </label>
        <input
          type="search"
          name="sarchBar"
          id="sarchBar"
          v-model="searchTerm"
        />
      </div>
      <button @click.prevent="search">Search</button>
    </form>
    <p class="error_msg" v-if="searchErrormsg">{{ searchErrormsg }}</p>
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
        :editBtnActive="editBtnActive"
        :userSlug="blog.user_id"
        :showSnippet="true"
      />
    </template>
    <template v-if="users.length > 0">
      <router-link
        class="user_link_wrap"
        :to="{ name: 'UserPage', params: { userSlug: user.user_id } }"
        v-for="user in users"
        :key="'userKey' + user.user_id + user.email"
      >
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
      </router-link>
    </template>
    <!-- <template v-if="users.length > 0">
      <User
        v-for="user in users"
        :key="'userKey' + user.user_id + user.email"
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
    </template> -->
    <button
      class="more_blogs_btn"
      @click="loadMoreResults"
      v-if="
        searchPagesInfo.page &&
        searchPagesInfo.page < searchPagesInfo.max_pages_with_current_limit
      "
    >
      Load more...
    </button>
  </div>
</template>

<script>
import Blog from "../components/Blog.vue";
import User from "../components/User.vue";
import axios from "axios";

export default {
  components: { Blog, User },
  data() {
    return {
      searchType: "blogs",
      searchTerm: "",
      searchLimit: 5,
      blogs: [],
      users: [],
      editBtnActive: false,
      url: process.env.VUE_APP_BASE_API_URL,
      searchPagesInfo: {},
      searchErrormsg: "",
      searchPage: 1,
      editUserBtn: false,
    };
  },
  methods: {
    loadMoreResults() {
      if (
        this.searchPagesInfo.page >=
        this.searchPagesInfo.max_pages_with_current_limit
      ) {
        console.log("All results loaded");
        return;
      }
      axios
        .get(
          `${this.url}${this.searchType}/search/results?page=${
            parseInt(this.searchPagesInfo.page) + 1
          }&limit=${this.searchLimit}&search=${this.searchTerm}`
        )
        .then((res) => {
          if (res.data.data[0].blog_id) {
            res.data.data.forEach((blog) => {
              this.blogs.push(blog);
            });
            this.searchPagesInfo = res.data.aditional_info;
            console.log(this.searchPagesInfo);
            this.searchErrormsg = "";
            this.users = [];
          } else {
            res.data.data.forEach((user) => {
              if (!user.img) {
                user.img = require("../assets/default_avatar.png");
              }
              this.users.push(user);
            });

            this.searchPagesInfo = res.data.aditional_info;
            console.log(this.searchPagesInfo);
            this.searchErrormsg = "";
            this.blogs = [];
          }
        })
        .catch((err) => {
          if (err.response) {
            this.searchErrormsg = err.response.data.msg;
            console.log(this.searchErrormsg);
          } else {
            console.log(err);
          }
        });
    },
    search() {
      axios
        .get(
          `${this.url}${this.searchType}/search/results?page=${this.searchPage}&limit=${this.searchLimit}&search=${this.searchTerm}`
        )
        .then((res) => {
          if (res.data.data[0].blog_id) {
            this.blogs = res.data.data;
            this.searchPagesInfo = res.data.aditional_info;
            console.log(this.searchPagesInfo);
            this.searchErrormsg = "";
            this.users = [];
          } else {
            this.users = res.data.data;
            this.users.forEach((user) => {
              if (!user.img) {
                user.img = require("../assets/default_avatar.png");
              }
            });
            this.searchPagesInfo = res.data.aditional_info;
            console.log(this.searchPagesInfo);
            this.searchErrormsg = "";
            this.blogs = [];
          }
        })
        .catch((err) => {
          if (err.response) {
            this.searchErrormsg = err.response.data.msg;
            console.log(this.searchErrormsg);
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
.search_page {
  padding: 50px 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--lvl1-pink);
  min-height: 100vh;
}
.seacrh_form {
  padding: 5px;
  border: 1px solid black;
  margin-bottom: 50px;
}
.seacrh_form .form_group {
  margin: 10px 0;
}
.search_page .error_msg {
  text-align: center;
  padding: 10px;
  font-size: var(--fontTextBig);
  margin: 10px 0;
}
.user_link_wrap {
  height: 100%;
  margin-bottom: 30px;
}
.search_page .user_details {
  margin-bottom: 0;
}
</style>