<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">New Bookmark</h3>
    <input
      v-model="bookmark.bookmarkData.title"
      type="text"
      ref="title"
      placeholder="Title"
      class="input mb-3"
    />
    <input
      v-model="bookmark.bookmarkData.url"
      type="text"
      placeholder="URL"
      class="input mb-3"
    />
    <select v-model="bookmark.bookmarkData.categoryId" class="input mb-3">
      <option disabled :value="null" selected>Please Select Category</option>
      <option
        v-for="category in bookmark.categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <textarea
      v-model="bookmark.bookmarkData.comment"
      placeholder="Comment"
      class="input mb-3"
      cols="30"
      rows="10"
    ></textarea>
    <div class="flex items-center justify-end gap-x-1">
      <button
        @click="$router.push({ name: 'HomePage' })"
        class="secondary-button"
      >
        Cancel
      </button>
      <button @click="onSave" class="default-button">Save</button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, nextTick, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const $store = useStore();
const $router = useRouter();
const $axios = inject("appAxios");
const $socket = inject("socketio");
const title = ref(null);

const bookmark = reactive({
  categories: null,
  bookmarkData: {
    title: null,
    url: null,
    categoryId: null,
    comment: null,
  },
});

$axios.get("/categories").then((res) => {
  bookmark.categories = res.data;
});
onMounted(() => {
  nextTick(() => {
    console.log(title.value.focus());
    title.value.focus();
  });
});

const _getCurrentUser = computed(() => $store.getters._getCurrentUser);
const isDataValidation = computed(() => {
  return (
    bookmark.bookmarkData.title &&
    bookmark.bookmarkData.url &&
    bookmark.bookmarkData.categoryId &&
    bookmark.bookmarkData.comment
  );
});

const onSave = () => {
  if (isDataValidation.value) {
    const saveData = {
      ...bookmark.bookmarkData,
      userId: _getCurrentUser.value.id,
      created_at: new Date(),
    };
    $axios.post("bookmarks", saveData).then((res) => {
      const socketData = {
        ...res.data,
        user: _getCurrentUser.value,
        category: bookmark.categories?.find(
          (c) => c.id === saveData.categoryId
        ),
      };
      // console.log(socketData)
      $socket.emit("NEW_BOOKMARK_EVENT", socketData);

      bookmark.bookmarkData = {
        title: null,
        url: null,
        categoryId: null,
        comment: null,
      };

      $router.push({ name: "HomePage" });
    });
  } else {
    alert("Please fill nessesary inputs...");
  }
};
</script>
