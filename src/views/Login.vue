<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Sign In</h3>
    <input
      v-model="userData.username"
      type="text"
      placeholder="User Name"
      class="input mb-3"
    />
    <input
      v-model="userData.password"
      type="password"
      placeholder="Password"
      class="input mb-3"
    />
    <button @click="login" class="default-button">Sign In</button>
    <span class="text-center mt-3 text-sm">
      I have not a account.
      <router-link
        :to="{ name: 'RegisterPage' }"
        class="text-red-900 hover:text-black"
      >
        Please Sign Up!</router-link
      >
    </span>
  </div>
</template>

<script setup>
import CryptoJs from "crypto-js";
import { computed, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const userData = ref({
  username: null,
  password: null,
});

const $axios = inject("appAxios");
const $store = useStore();
const $router = useRouter();

const isUserValidation = computed(() => {
  return userData.value.username != null && userData.value.password != null;
});

const login = () => {
  if (isUserValidation) {
    const key = "booklike1234!";
    const password = CryptoJs.HmacSHA1(userData.value.password, key).toString();

    $axios
      .get(`/users?username=${userData.value.username}&${password}`)
      .then((res) => {
        if (res?.data?.length > 0) {
          $store.commit("setUser", res?.data[0]);
          $router.replace("/");
        } else {
          alert("This user not found on the system");
        }
      });
  } else {
    alert("Please Fill all nessesary inputs");
  }
};
</script>
