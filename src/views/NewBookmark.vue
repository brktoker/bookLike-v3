<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">New Bookmark</h3>
    <input
      v-model="bookmarkData.title"
      type="text"
      ref="title"
      placeholder="Title"
      class="input mb-3"
    />
    <input
      v-model="bookmarkData.url"
      type="text"
      placeholder="URL"
      class="input mb-3"
    />
    <select v-model="bookmarkData.categoryId" class="input mb-3">
      <option disabled :value="null" selected>Please Select Category</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <textarea
      v-model="bookmarkData.comment"
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

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      categories: null,
      bookmarkData: {
        title: null,
        url: null,
        categoryId: null,
        comment: null,
      },
    };
  },
  created() {
    this.$axios.get("/categories").then((res) => {
      this.categories = res.data;
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.title.focus();
    });
  },
  computed: {
    ...mapGetters(["_getCurrentUser"]),
    isDataValidation() {
      return (
        this.bookmarkData.title &&
        this.bookmarkData.url &&
        this.bookmarkData.categoryId &&
        this.bookmarkData.comment
      );
    },
  },
  methods: {
    onSave() {
      if (this.isDataValidation) {
        const saveData = {
          ...this.bookmarkData,
          userId: this._getCurrentUser?.id,
          created_at: new Date(),
        };
        this.$axios.post("bookmarks", saveData).then((res) => {
          

          const socketData = {
            ...res.data,
            user: this._getCurrentUser,
            category: this.categories?.find((c) => c.id === saveData.categoryId),
          };
          // console.log(socketData)
          this.$socket.emit("NEW_BOOKMARK_EVENT", socketData);

          this.bookmarkData = {
            title: null,
            url: null,
            categoryId: null,
            comment: null,
          };

          this.$router.push({ name: "HomePage" });
        });
      } else {
        alert("Please fill nessesary inputs...");
      }
    },
  },
};
</script>
