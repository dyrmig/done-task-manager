<template>
  <nav>
    <div class="logo">
      <div class="logo-container"><router-link to="/"><img src="../assets/images/logo-done.png" alt="Done Task Logo"></router-link></div>
    </div>
    <div class="button-wrapper">
      <div class="button-container"><router-link to="/account"><img src="../assets/images/usuario.png" alt="Your profile"></router-link>
        <div class="button-tag">User Profile</div>
      </div>
    </div>
    <div class="button-wrapper">
      <div class="button-container">
        <a v-if="currentRoute === '/' || currentRoute === '/add'" @click="$emit('showNewTask')"><img src="../assets/images/mas.png" alt="Add New Task"></a>
        <router-link v-else to="/add"><img src="../assets/images/mas.png" alt="Add New Task"></router-link>
        <div class="button-tag">New Task</div>
      </div>
    </div>
    <div class="button-wrapper">
      <div class="button-container"><a @click="signOut"><img src="../assets/images/cerrar-sesion.png" alt="Log Out"></a>
        <div class="button-tag">Log Out</div>
    </div>
    </div>
  </nav>

  <div class="mobile-nav">
    <div class="logo">
      <div class="logo-container"><router-link to="/"><img src="../assets/images/logo-done.png" alt="Done Task Logo"></router-link></div>
    </div>

    <div class="mobile-btns-container">
      <div class="button-wrapper">
      <div class="button-container"><router-link to="/account"><img src="../assets/images/usuario.png" alt="Your profile"></router-link>
      </div>
      </div>
      <div class="button-wrapper">
        <div class="button-container">
          <a v-if="currentRoute === '/' || currentRoute === '/add'" @click="$emit('showNewTask')"><img src="../assets/images/mas.png" alt="Add New Task"></a>
          <router-link v-else to="/add"><img src="../assets/images/mas.png" alt="Add New Task"></router-link>
        </div>
      </div>
      <div class="button-wrapper">
        <div class="button-container"><a @click="signOut"><img src="../assets/images/cerrar-sesion.png" alt="Log Out"></a>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from 'vue-router'
import { ref } from 'vue';

const currentRoute = ref(useRoute().path);
//console.log(currentRoute.value);

const newTaskOutsideHome = () => {
  redirect.push({ path: "/", params: { newtask: true } });
  emit('showNewTask');
}

const emit = defineEmits(["showNewTask", "cancelNewTask"]);

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try{
    // call the user store and send the users info to backend to signOut
    useUserStore().signOut();
    // then redirect user to the homeView
    redirect.push({ path: "/auth/login" });
  } catch (error) {}
};

</script>

<style>
</style>
