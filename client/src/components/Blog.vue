<template>
  <div class="blog_container">
    <h1 class="blog_title">{{ blog_title }}</h1>
    <article class="blog_header">
      <p>
        written by:
        <router-link
          v-if="userSlug"
          :to="{ name: 'UserPage', params: { userSlug: userSlug } }"
          >{{ blog_writer }}</router-link
        >
      </p>
      <p>date: {{ blog_date }}</p>
    </article>
    <p class="blog_body" v-if="!showSnippet">
      {{ blog_body }}
    </p>
    <router-link
      v-if="blog_id"
      :to="{ name: 'BlogPage', params: { blogSlug: blog_id } }"
    >
      <p class="blog_snippet" v-if="showSnippet">
        {{ blog_snippet }}
        <span>CLICK to read more...</span>
      </p>
    </router-link>
    <button
      class="edit_blog_btn"
      v-if="editBtnActive"
      @click="editBlog(blogToEdit)"
    >
      Edit blog
    </button>

    <!-- Update Blog Modal -->
    <div class="update_blog_modal" v-if="updateBlogModal">
      <div class="update_blog_form" id="update_blog_form">
        <div class="form_group">
          <label for="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            v-model="updateBlogData.title"
          />
        </div>
        <div class="form_group">
          <label for="body_snippet">Body snipet: </label>
          <input
            type="text"
            name="body_snippet"
            id="body_snippet"
            v-model="updateBlogData.body_snippet"
          />
        </div>
        <div class="form_group">
          <label for="body">Blog text: </label>
          <textarea
            name="body"
            id="body"
            cols="50"
            rows="10"
            v-model="updateBlogData.body"
          ></textarea>
        </div>
        <button type="" @click.prevent="updateBlog">Update Blog</button>
        <p class="error_msg" v-if="userErrormsg">{{ userErrormsg }}</p>
        <p class="closeLogin" @click="updateBlogModal = false">Go Back</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: [
    "editBtnActive",
    "blog_title",
    "blog_writer",
    "blog_date",
    "blog_body",
    "blog_snippet",
    "blog_id",
    "showSnippet",
    "userSlug",
    "blogToEdit",
  ],
  data() {
    return {
      blogToBeEdited: null,
      updateBlogModal: false,
      userErrormsg: "",
      url: process.env.VUE_APP_BASE_API_URL,
      updateBlogData: {
        title: "",
        body_snippet: "",
        body: "",
      },
    };
  },
  methods: {
    editBlog(blogToEdit) {
      this.blogToBeEdited = blogToEdit;
      this.updateBlogData.title = this.blogToBeEdited.title;
      this.updateBlogData.body_snippet = this.blogToBeEdited.body_snippet;
      this.updateBlogData.body = this.blogToBeEdited.body;
      this.updateBlogModal = true;
    },
    updateBlog() {
      const axiosData = {
        title: this.updateBlogData.title,
        body_snipet: this.updateBlogData.body_snipet,
        body: this.updateBlogData.body,
      };
      axios
        .put(
          `${this.url}blogs/${this.blogToBeEdited.blog_id}`,
          this.updateBlogData,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          this.$router.go();
        })
        .catch((err) => {
          if (err.response) {
            this.userErrormsg = err.response.data.msg;
            console.log(err.response);
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

.blog_container {
  width: 100%;
  max-width: 85ch;
  text-align: center;
  color: var(--text-color);
  background-color: var(--lvl1-yellow);
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0 0 5px var(--lvl4-purple);
}
.blog_container + .blog_container {
  margin-top: 25px;
}
.blog_container a {
  color: inherit;
}
h1 {
  font-size: var(--fontH1);
  margin-bottom: 40px;
}
.blog_header {
  display: flex;
  justify-content: space-between;
  font-size: var(--fontTextSmall);
  font-weight: bold;
  opacity: 0.8;
  font-style: italic;
  text-transform: capitalize;
}
.blog_body {
  text-align: left;
  line-height: 1.4rem;
}

.blog_body,
.blog_snippet {
  font-size: var(--fontTextMedium);
  margin: 15px 0;
  line-break: anywhere;
}
.blog_snippet span {
  display: block;
  margin: 15px 0;
  font-weight: 600;
}
.edit_blog_btn {
  margin: 50px auto 0 auto;
  display: block;
  font-size: var(--fontTextBig);
  background-color: transparent;
  border: 1px solid var(--lvl4-purple);
  padding: 5px;
  border-radius: 10px;
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 150ms ease-in, color 150ms ease-in;
}
.edit_blog_btn:hover {
  background-color: var(--lvl4-purple);
  color: var(--lvl1-pink);
}
.update_blog_modal {
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
.update_blog_form {
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
.update_blog_form input {
  margin-left: auto;
  width: 60%;
}
.update_blog_form label {
  color: var(--lvl1-pink);
}
.update_blog_form .form_group {
  margin: 15px 0;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
}
</style>