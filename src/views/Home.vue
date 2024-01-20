<template>
  <div>
    <AppHeader />
    <div class="flex flex-row">
      <AppSideBar @changedCategory="updateBookmarkList" />
      <BookmarkList :items="bookmarkList" v-if="bookmarkList.length > 0" />
      <h3 v-else>
        Not found bookmark on this category..
      </h3>
    </div>
  </div>
</template>

<script>
import AppSideBar from "@/components/Home/AppSideBar.vue";
export default {
  components: {
    AppSideBar,
  },
  data() {
    return {
      bookmarkList: [],
    };
  },
  created() {
    this.fetchedData();
  },
  mounted(){
    this.$socket.on("NEW_BOOKMARK_ADDED", (bookmark) => {
      // console.log(bookmark)
      this.bookmarkList.push(bookmark)
      
    })
  },
  methods: {
    fetchedData(){
      this.$axios.get("/bookmarks?_expand=category&_expand=user").then((res) => {
      this.bookmarkList = res?.data || [];
    });
    },
    updateBookmarkList(id) {
      const url = id
        ? `/bookmarks?_expand=category&_expand=user&categoryId=${id}`
        : "/bookmarks?_expand=category&_expand=user";
      this.$axios.get(url).then((res) => {
        this.bookmarkList = res?.data || [];
      });
    },
  },
};
</script>
