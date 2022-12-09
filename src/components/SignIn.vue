<!-- COMPONENTE BOILERPLATE -->
 
<template>
    
    <div class="login-container">
      <div class="logo-container-login"><a><img src="../assets/images/logo-done.png" alt="Done Task Logo"></a></div>
      <h2>Task Manager</h2>
      <div class="login-inputs-container">
        <label for="mail">Email:</label>
        <input id="mail" type="text" v-model="userData.email" />
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="userData.password" />
        <button class="login-btn" @click="signIn">Login</button>
        <p class="signup-text">Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p>
      </div>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useRouter } from "vue-router";
import { ref, computed, reactive } from "vue";
import { useUserStore } from "../stores/user";

// const userID = ref('default');
// const userPassword = ref('default');
const userData = reactive({
    email: '',
    password: ''
})

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";
// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(userData.email, userData.password);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  try {} catch (error) {
    // displays error message
    errorMsg.value = error.message;
      // hides error message
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
  }
};
</script>

<style></style>
