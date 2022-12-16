<template>
  <div class="wrapper">
    <Nav />
    <div class="content">
      
      <div class="profile">
        <h1>Your Profile</h1>
        <br>
        <!-- <img class="profile-pic" :src="avatar_url ? avatar_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture"> -->
        <form class="form-widget" @submit.prevent="saveProfile">
          <Avatar v-model:path="avatar_url" @upload="saveProfile" size="10" />
         </form>

        <br>
        <!-- <textarea class="active-title-task-input" v-if="editMode" type="text" v-model="avatar_url"></textarea> -->

        <br>
        <textarea class="inactive-title-task-input" v-if="!editMode" type="text" v-model="username"></textarea>
            <textarea class="active-title-task-input" v-else type="text" v-model="username"></textarea>
        <br>
        <h3>{{email}}</h3>
        
        <div class="buttons-task-item visible">
            <div v-if="!editMode" @click="editProfile" class="task-btn edit"><img src="../assets/images/rebautizar.png" alt="Done Task Logo"></div>
            <div v-if="editMode" @click="saveProfile" class="task-btn done"><img src="../assets/images/guardar.png" alt="Done Task Logo"></div>
            <div v-if="editMode" @click="cancelEditProfile" class="task-btn delete"><img src="../assets/images/cerca.png" alt="Done Task Logo"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';
  import Avatar from '../components/Avatar.vue';

  const userStore = useUserStore();

  const loading = ref(false);
  const userId = ref(null);
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);
  const email = ref(null);
  const editMode = ref(false);

  const cancelEditProfile = () => {
    editMode.value = false;
    getProfile();
  }
  const editProfile = () => {
    editMode.value = true;
  }
  async function saveProfile() {
    await userStore.updateProfile(userId.value, username.value, avatar_url.value);
    cancelEditProfile();
  }
  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
    userId.value = userStore.profile.user_id;
    username.value = userStore.profile.user_name;
    avatar_url.value = userStore.profile.avatar_url;
    email.value = userStore.profile.email;
  }

  async function signOut() {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
</script>