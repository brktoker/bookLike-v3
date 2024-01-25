<template>
  <div>
    <AppHeader />
    <div class="flex flex-row">
      <AppSideBar @changedCategory="updateBookmarkList" />
      <BookmarkList :items="bookmarkList" v-if="bookmarkList.length > 0" />
      <h3 v-else>Not found bookmark on this category..</h3>
    </div>
  </div>
</template>

<script setup>
import AppSideBar from "@/components/Home/AppSideBar.vue";
import { inject, onMounted, ref } from "vue";

const $appAxios = inject("appAxios");
const $socket = inject("socketio");

const bookmarkList = ref([]);

onMounted(() => {
  $socket.on("NEW_BOOKMARK_ADDED", (bookmark) => {
    // console.log(bookmark)
    bookmarkList.value.push(bookmark);
  });
});

const fetchedData = () => {
  $appAxios.get("/bookmarks?_expand=category&_expand=user").then((res) => {
    bookmarkList.value = res?.data || [];
  });
};
const updateBookmarkList = (id) => {
  const url = id
    ? `/bookmarks?_expand=category&_expand=user&categoryId=${id}`
    : "/bookmarks?_expand=category&_expand=user";
  $appAxios.get(url).then((res) => {
    bookmarkList.value = res?.data || [];
  });
};

fetchedData();
</script>
