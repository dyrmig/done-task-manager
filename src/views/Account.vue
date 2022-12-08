<template>
  <div class="wrapper">
    <Nav />
    <div class="content">
      <div class="profile">
        <h1>{{username}}</h1>
        <h1>{{email}}</h1>
        <img class="profile-pic" :src="avatar_url ? avatar_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'" alt="Profile picture">
      </div>
    </div>
  </div>
</template>

<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import { useUserStore } from "../stores/user";
  import Nav from '../components/Nav.vue';

  const userStore = useUserStore();

  const loading = ref(false);
  const username = ref(null);
  const website = ref(null);
  const avatar_url = ref(null);
  const email = ref(null);

  onMounted(() => {
    getProfile();
  });

  async function getProfile() {
    await userStore.fetchUser();
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

<style>
.profile-pic {
  width: 100px;
  border-radius: 50%;
}
</style>