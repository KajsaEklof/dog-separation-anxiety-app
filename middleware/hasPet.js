import supabase from '@/utils/supabase.js';

export default async function ({ redirect, route }) {
  const isAuthPage =
    route.name === 'sign-in' ||
    route.name === 'sign-up' ||
    route.name === 'add-pet';

  const petIdentity = await supabase.from('pet_identity').select('*');

  console.log('auth middleware hasPet', petIdentity);

  if (!petIdentity.data.length && !isAuthPage) {
    redirect({ name: 'add-pet' });
  }
}
