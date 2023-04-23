import { v4 as uuid } from 'uuid';
import { supabase } from '@/supabase';

export interface IAddPetIdentityOptions {
  name: string;
  targetTime: number;
  dob?: Date;
}

export default function usePetIdentity() {
  const addPet = async ({ name, dob, targetTime }: IAddPetIdentityOptions) => {
    const getUser = await supabase.auth.getUser();
    const user = getUser.data.user;

    const { error } = await supabase.from('pet_identity').insert({
      id: uuid(),
      created_at: new Date(),
      name,
      dob,
      target_time: targetTime,
      user_id: user?.id,
    });

    return { error };
  };

  const getPet = async () => {
    const pet = await supabase.from('pet_identity').select('*');

    return pet;
  };

  const updatePetTargetTime = async (targetDuration: string, petId: string) => {
    const call = await supabase
      .from('pet_identity')
      .update({ target_duration: targetDuration })
      .eq('id', petId);

    return call;
  };

  return {
    addPet,
    getPet,
    updatePetTargetTime,
  };
}
