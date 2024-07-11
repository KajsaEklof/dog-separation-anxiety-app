import { supabase } from '@/supabase';
import { Ref, ref } from 'vue';
import useAuthUser from "@/composables/AuthUser";

// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user
const user: any = ref(null);
const userId: Ref<null> = ref(null);

export default function useUserAccount() {
  const { getUserAccount } = useAuthUser();


 const checkUser = async () => {
  // * get logged in user and email from auth session
    const userData = await getUserAccount();
    const email = userData?.data.user?.email;
  
    if (!email) {
      return;
    }
  
    // * get user from users table if it exists
    const dbUser = await supabase.from('users'). select('*').eq('username', email);
  
    if (dbUser.data?.length === 0) {
      // * if user doesn't exist, add user to table
      const res = await supabase.from('users').insert([{ username: email }]);

      // handle error
    }

    if (dbUser.data) {
     user.value = dbUser.data[0];
     userId.value = dbUser.data[0].id;
    }
  }

  return { user, userId, checkUser };
}