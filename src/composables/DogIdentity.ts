import { v4 as uuid } from 'uuid';
import { supabase } from '@/supabase';
import useAuthUser from "@/composables/AuthUser";


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
    const { getUserAccount } = useAuthUser();
    const user = await getUserAccount()
    const userId = user?.id;

    if (!userId) {
      return;
    }

    const pet = await supabase.from('pets').select('*').contains('user_ids', [userId]);

    if (pet.data?.length === 0 || !pet.data) {
      return
    }

    return pet.data[0];
  };

  const updatePetTargetTime = async (targetDuration: string, petId: string) => {
    const call = await supabase
      .from('pet_identity')
      .update({ target_duration: targetDuration })
      .eq('id', petId);

    return call;
  };

  const updateDogDetails = async (details: {
    breed: null | string,
    weight: null | string,
    sex: null | string,
    dob: null | string,
  }, petId: string) => {
    const data: {
      breed?: string,
      weight?: string,
      sex?: string,
      dob?: string,
    } = {}

    if (details.breed) {
      data.breed = details.breed
    }
    if (details.weight) {
      data.weight = details.weight
    }
    if (details.sex) {
      data.sex = details.sex
    }
    if (details.dob) {
      data.dob = details.dob
    }

    const call = await supabase
      .from('pet_identity')
      .update(data)
      .eq('id', petId);

    if (call.error) {
      throw new Error(`Not able to update dog details, ${call.error}`)
    }
  }

  return {
    addPet,
    getPet,
    updatePetTargetTime,
    updateDogDetails
  };
}
