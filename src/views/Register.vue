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

<script>
import CryptoJs from "crypto-js";
export default {
  data() {
    return {
      userData: {
        username: null,
        fullname: null,
        password: null,
      },
    };
  },
  computed: {
    isUserValidation() {
      return (
        this.userData.username != null &&
        this.userData.fullname != null &&
        this.userData.password != null
      );
    },
  },
  methods: {
    register() {
      if (this.isUserValidation) {
        const key = "booklike1234!";
        const password = CryptoJs.HmacSHA1(
          this.userData.password,
          key
        ).toString();
        this.$axios
          .post("/users", { ...this.userData, password })
          .then((res) => {
            this.$store.commit("setUser", res?.data[0]);
            this.$router.replace("/");
          });
      } else {
        alert("Please Fill all nessesary inputs");
      }
    },
  },
};
</script>
