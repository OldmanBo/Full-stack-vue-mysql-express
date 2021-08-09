<template>
  <div class="home_page">
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
    <button class="more_blogs_btn" @click="loadMoreBlogs">
      Load more bloogs
    </button>
  </div>
</template>

<script>
import axios from "axios";
import Blog from "../components/Blog.vue";

export default {
  components: { Blog },
  data() {
    return {
      blogs: {},
      editBtnActive: false,
      blogPagesInfo: {},
      url: process.env.VUE_APP_BASE_API_URL,
    };
  },
  methods: {
    loadMoreBlogs() {
      if (
        this.blogPagesInfo.page >=
        this.blogPagesInfo.max_pages_with_current_limit
      ) {
        console.log("All blogs loaded");
        return;
      }
      axios
        .get(
          `${this.url}blogs/search/results?page=${
            parseInt(this.blogPagesInfo.page) + 1
          }`
        )
        .then((res) => {
          res.data.data.forEach((blog) => {
            this.blogs.push(blog);
          });
          this.blogPagesInfo = res.data.aditional_info;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    console.log("homepage");
    console.log(this.$store.getters.getActiveUser);
    axios
      .get(`${this.url}blogs/search/results`, { withCredentials: true })
      .then((res) => {
        this.blogs = res.data.data;
        this.blogPagesInfo = res.data.aditional_info;
      })
      .catch((err) => {
        console.log(err);
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

.home_page {
  padding: 50px 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--lvl1-pink);
}
.more_blogs_btn {
  margin-top: 20px;
  font-size: var(--fontTextMedium);
}
</style>