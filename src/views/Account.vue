<template>
  <AppHeader />
  <div class="flex flex-row">
    <side-bar />
    <!-- <component :is="$route.meta.componentName" :items="bookmarkList" /> -->
    <!-- {{ $log($route) }} -->
    <!-- <app-bookmark-list v-if="bookmarkList.length > 0" :items="bookmarkList" />
    <div v-else>Bookmark bulunmamaktadır..</div> -->
  </div>
</template>

<script setup>
import sideBar from "@/components/Account/sideBar";
import { inject, ref } from "vue";
const bookmarkList = ref([]);
const $axios = inject("appAxios");

const initializeData = () => {
  $axios
    .get("/bookmarks?_expand=category&_expand=user")
    .then((bookmark_list_response) => {
      bookmarkList.value = bookmark_list_response?.data || [];
    });
};

initializeData();
</script>
