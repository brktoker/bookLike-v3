<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Register</h3>
    <input
      v-model="userData.fullname"
      type="text"
      placeholder="Full Name"
      class="input mb-3"
    />
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
    <button class="default-button" @click="register">Sign Up</button>
    <span class="text-center mt-3 text-sm">
      I have already account,
      <router-link
        :to="{ name: 'LoginPage' }"
        class="text-red-900 hover:text-black"
        >Sign In!</router-link
      >
    </span>
  </div>
</template>

<script setup>
import CryptoJs from "crypto-js";
import { computed, inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const $axios = inject("appAxios");
const $store = useStore();
const $router = useRouter();

const userData = ref({
  username: null,
  fullname: null,
  password: null,
});

const isUserValidation = computed(() => {
  return (
    userData.value.username != null &&
    userData.value.fullname != null &&
    userData.value.password != null
  );
});

const register = () => {
  if (isUserValidation) {
    const key = "booklike1234!";
    const password = CryptoJs.HmacSHA1(userData.value.password, key).toString();
    $axios.post("/users", { ...userData.value, password }).then((res) => {
      $store.commit("setUser", res?.data[0]);
      $router.replace("/");
    });
  } else {
    alert("Please Fill all nessesary inputs");
  }
};
</script>
