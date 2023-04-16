
import { v4 as uuid } from "uuid";
import { supabase } from "@/supabase";
import usePetIdentity from '@/composables/DogIdentity';
import { usePetStore } from '@/stores/DogStore';

export interface IStartTrainingSessionOptions {
  warmups: number;
  targetTime: string,
}

// const petStore = usePetStore();

export default function useTrainingSession() {
  const getBaseTrainingSessionDetails = async () => {
    if (!supabase) {
      return;
    }

    const { getPet } = usePetIdentity();
    const pet = await getPet();
    if (!pet || !pet.data) {
      throw new Error('No dog added yet')
    }

    const duration = pet.data[0].target_duration

    return duration
  }

  const newTrainingSession = async ({ warmups, targetTime }: IStartTrainingSessionOptions) => {
    if (!supabase) {
      return;
    }

    const { getPet } = usePetIdentity();
    const pet = await getPet();

    if (!pet || !pet.data) {
      throw new Error('No dog added yet')
    }

    const petId = pet.data[0].id
    const sessionId = uuid();

    const getUser = await supabase.auth.getUser();
    const user = getUser.data.user;
    if (!user) {
      throw new Error('No logged in user');
    }

    const userEmail = user.email;
    const { error } = await supabase.from('training_session')
      .insert({ id: sessionId, created_at: new Date, warmups, target_duration: targetTime, pet_id: petId, email: userEmail });

    return { error, sessionId }
  };

  const updateTrainingSession = async (result: string, sessionId: string) => {
    if (!supabase) {
      return;
    }
    const { getPet } = usePetIdentity();
    const pet = await getPet();

    if (!pet || !pet.data || !pet.data[0]) {
      throw new Error('No dog added yet')
    }

    const petId = pet.data[0].id

    const data = {
      id: sessionId,
      completed_at: Date.now,
      good: false,
      ok: false,
      bad: false,
      pet_id: petId
    }

    switch (result) {
      case 'aced-it':
        data.good = true;
        break;
      case 'ok':
        data.ok = true;
        break;
      case 'struggled':
        data.bad = true;
        break;
    }

    const call = await supabase
      .from('training_session')
      .upsert(data)
      .eq('id', sessionId)

    return call
  }

  return {
    getBaseTrainingSessionDetails,
    newTrainingSession,
    updateTrainingSession,
  }
}