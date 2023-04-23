import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from '@supabase/supabase-js';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: '',
    app_metadata: {},
    user_metadata: {},
    aud: '',
  });

  function setUser(currentUser: User) {
    user.value = currentUser;
  }

  return { user, setUser };
});
