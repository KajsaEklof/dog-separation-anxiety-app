import { createClient } from '@supabase/supabase-js';
import useAuthUser from '~/composables/AuthUser';

const supabaseURL = process.env.NUXT_ENV_SUPABASE_URL;
const supabaseKEY = process.env.NUXT_ENV_SUPABASE_KEY;
if (!supabaseURL || !supabaseKEY) {
  throw new Error('Supabase env not found');
}

const supabase = createClient(supabaseURL, supabaseKEY);

// ⬇ setup auth state listener ⬇
supabase.auth.onAuthStateChange((event, session) => {
  console.log('onAuthStateChange', event);
  const { user } = useAuthUser();

  user.value = session?.user || null;
});

export default supabase;
