<template>
  <div class="p-2 grid grid-cols-6 gap-4" style="max-height: 150px !important">
    <BookmarkListItems
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script>
import BookmarkListItems from "@/components/BookmarkItems/BookmarkListItems.vue";
export default {
  components: {
    BookmarkListItems,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
