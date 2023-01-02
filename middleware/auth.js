import supabase from '@/utils/supabase.js';

export default async function ({ redirect, route }) {
  const isAuthPage = route.name === 'sign-in' || route.name === 'sign-up';

  const user = await supabase.auth.user();

  console.log('auth middleware user', user);

  if (!user && !isAuthPage) {
    redirect({ name: 'sign-in' });
  }
}
