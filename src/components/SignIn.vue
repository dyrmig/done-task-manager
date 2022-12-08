<!-- COMPONENTE BOILERPLATE -->
 
  <template>

  <div class="container">
    <h3 class="header-title">Log In to ToDo App</h3>
    <input type="text" v-model="userData.email" />
    <input type="password" v-model="userData.password" />
    <button @click="signIn">Sign In</button>
    <p class="header-subtitle">Estamos en la ruta de login. Aquí deberíais crear un form con la lógica correspondiente para que este permita al usuario loguearse con su email y su contraseña. Miraros la lógica de SignUp si necesitáis inspiración :)</p>
    <p>Dont have an account? <PersonalRouter :route="route" :buttonText="buttonText" class="sign-up-link"/></p>
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
