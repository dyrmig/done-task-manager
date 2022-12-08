import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      if(user) {
        this.user = user;


        const { data: profile } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0];
        // console.log('user in store: ', this.user);
        // console.log('profile in store: ', this.profile);

        //console.log(this.profile);
        return this.profile;
      }
    },

    async signUp(email, password, username, useravatar) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(`userid:${this.user.id} name:${username} avatar:${useravatar}`);

        const { data, error } = await supabase.from('profiles').insert([
          {
            user_id: this.user.id,
            email: email,
            user_name: username,
            avatar_url: useravatar,
          },
        ]);
        
        //const { data, error } = await supabase.from("profiles").update({ full_name: username, avatar_url: useravatar }).match({id: this.user.id});
        console.log(error);
      }
    },

    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      },
      {
        shouldCreateUser: false,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        /* const { data: profile } = await supabase
        .from('profiles')
        .select()
        .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0];
        console.log('profile in store: ', profile); */
      }
    },

    async signOut(){
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});