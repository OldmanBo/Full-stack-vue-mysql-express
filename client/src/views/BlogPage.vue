<template>
  <div class="blog_page">
    <Blog
      v-if="errorResponse === null"
      :blog_title="blog.title"
      :blog_writer="blog.written_by"
      :blog_date="blog.date_created"
      :blog_body="blog.body"
      :blog_snippet="blog.body_snippet"
      :userSlug="blog.user_id"
      :showSnippet="false"
    />
    <ErrorMsg v-if="errorResponse !== null" :msg="errorResponse.msg" />
  </div>
</template>

<script>
import axios from "axios";
import Blog from "../components/Blog.vue";
import ErrorMsg from "../components/ErrorMsg.vue";

export default {
  components: { Blog, ErrorMsg },
  data() {
    return {
      url: process.env.VUE_APP_BASE_API_URL,
      blog: {},
      errorResponse: null,
    };
  },
  created() {
    const blogSlug = this.$route.params.blogSlug;
    axios
      .get(`${this.url}blogs/${blogSlug}`)
      .then((res) => {
        this.blog = res.data.data[0];
      })
      .catch((err) => {
        if (err.response.data) {
          console.log(err.response.data);
          this.errorResponse = err.response.data;
        } else {
          console.log(err);
        }
      });
  },
};
</script>

<style>
.blog_page {
  padding: 50px 20%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: var(--lvl1-pink);
}
</style>