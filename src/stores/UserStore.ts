import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from '@supabase/supabase-js';

export interface DBUser {
  id: string;
  username: string;
  avatar_url: string;
}

export const useUserStore = defineStore('user', () => {
  const sbUser = ref({
    id: '',
    app_metadata: {},
    user_metadata: {},
    aud: '',
  });

  function setSupabaseUser(currentUser: User) {
    sbUser.value = currentUser;
  }

  const dbUser = ref({
    id: '',
    username: '',
    avatar_url: '',
  });

  function setDbUser(currentUser: {[x: string]: any}) {
    dbUser.value.id = currentUser.id;
    dbUser.value.username = currentUser.username;
    dbUser.value.avatar_url = currentUser.avatar_url;
  }

  return { sbUser, setSupabaseUser, dbUser, setDbUser};
});
