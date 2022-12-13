<template>
  <div class="login-container">
      <div class="logo-container-login"><a><img src="../assets/images/logo-done.png" alt="Done Task Logo"></a></div>
      <h2>Sing Up new account:</h2>
      <div class="singup-inputs-container">
        <form @submit.prevent="signUp" class="form-sign-in">
        
        
          <label for="userName" class="input-field-label">Name</label>
          <input
            type="text"
            class="input-field"
            placeholder="My Name"
            id="userName"
            v-model="userName"
            required
          />

          <!-- <label for="userAvatarUrl" class="input-field-label">Avatar image URL</label>
          <input
            type="text"
            class="input-field"
            placeholder="https://image.com/image.jpg"
            id="userAvatarUrl"
            v-model="userAvatarUrl"
            required
          /> -->

          <label for="email" class="input-field-label">E-mail</label>
          <input
            type="email"
            class="input-field"
            placeholder="example@gmail.com"
            id="email"
            v-model="email"
            required
          />

          <label for="password" class="input-field-label">Password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="password"
            v-model="password"
            required
          />

          <label for="confirmPassword" class="input-field-label">Confirm password</label>
          <input
            type="password"
            class="input-field"
            placeholder="**********"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />


          <div v-show="errorMsg">{{errorMsg}}</div>
          <button class="login-btn" type="submit">Sign Up</button>
        </form>
        
        <p class="signup-text">Have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link" /></p>
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
//nuevos campos
const userName = ref("");
const userAvatarUrl = ref("default.png");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value, userName.value, userAvatarUrl.value);
      // redirects user to the homeView
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      // displays error message
      errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "error";
};
</script>

<style></style>