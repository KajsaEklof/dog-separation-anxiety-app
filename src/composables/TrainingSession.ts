import { v4 as uuid } from 'uuid';
import { supabase } from '@/supabase';
import usePetIdentity from '@/composables/DogIdentity';
import { usePetStore } from '@/stores/DogStore';

export interface IStartTrainingSessionOptions {
  warmups: number;
  targetTime: string;
}

// const petStore = usePetStore();

export default function useTrainingSession() {
  const getSessionInProgress = async () => {
    if (!supabase) {
      return;
    }

    const { getPet } = usePetIdentity();
    const pet = await getPet();
    if (!pet || !pet.data) {
      throw new Error('No dog added yet');
    }

    const getUser = await supabase.auth.getUser();
    const user = getUser.data.user;
    if (!user) {
      throw new Error('No logged in user');
    }

    // const { data, error } = await supabase.from('training_session')
    //   .select('*')
    //   .eq('user_id', user.id)
    //   .eq('pet_id', pet.data[0].id)
    //   .eq("completed_at", null)

    const { data, error } = await supabase
      .from('training_session')
      .select()
      .eq('user_id', user.id)
      .eq('pet_id', pet.data[0].id)
      .is('completed_at', null)

    if (data?.length) {
      return {
        warmups: data[0].warmups as number,
        targetTime: data[0].target_duration as string,
        sessionId: data[0].id as string,
      };
    }

    return;
  }

  const getBaseTrainingSessionDetails = async () => {
    if (!supabase) {
      return;
    }

    const { getPet } = usePetIdentity();
    const pet = await getPet();
    if (!pet || !pet.data) {
      throw new Error('No dog added yet');
    }

    const duration = pet.data[0].target_duration;

    return duration;
  };

  const newTrainingSession = async ({
    warmups,
    targetTime,
  }: IStartTrainingSessionOptions) => {
    if (!supabase) {
      return;
    }

    const { getPet } = usePetIdentity();
    const pet = await getPet();

    if (!pet || !pet.data) {
      throw new Error('No dog added yet');
    }

    const petId = pet.data[0].id;
    const sessionId = uuid();

    const getUser = await supabase.auth.getUser();
    const user = getUser.data.user;
    if (!user) {
      throw new Error('No logged in user');
    }

    const userEmail = user.email;
    const { error } = await supabase.from('training_session').insert({
      id: sessionId,
      created_at: new Date(),
      warmups,
      target_duration: targetTime,
      pet_id: petId,
      email: userEmail,
    });

    return { error, sessionId };
  };

  const updateTrainingSession = async (result: string, sessionId: string) => {
    if (!supabase) {
      return;
    }

    const getUser = await supabase.auth.getUser();
    const user = getUser.data.user;
    if (!user) {
      throw new Error('No logged in user');
    }

    const { getPet } = usePetIdentity();
    const pet = await getPet();

    if (!pet || !pet.data || !pet.data[0]) {
      throw new Error('No dog added yet');
    }

    const petId = pet.data[0].id;

    const data = {
      id: sessionId,
      completed_at: new Date(),
      good: false,
      ok: false,
      bad: false,
      pet_id: petId,
      user_id: user.id
    };

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
      .eq('id', sessionId);

    console.log('call', call)

    return call;
  };

  const getWeeklyTrainingSessions = async () => {
    const today = new Date();
    const firstDay = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    );
    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7));
    const startDate = `${firstDay.getFullYear()}-${(firstDay.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${firstDay.getDate().toString().padStart(2, "0")}`;
    const endDate = `${lastDay.getFullYear()}-${(lastDay.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${lastDay.getDate().toString().padStart(2, "0")}`;

    const { getPet } = usePetIdentity();
    const pet = await getPet();

    if (!pet || !pet.data || !pet.data[0]) {
      throw new Error('No dog added yet');
    }

    const petId = pet.data[0].id;

    const call = await supabase
      .from('training_session')
      .select('*')
      .eq('pet_id', petId)
      .gte('completed_at', startDate)
      .lte('completed_at', endDate)

    console.log("call", call)
    if (call.data && 0 < call.data.length) {
      return call.data
    }

    return undefined
  }

  return {
    getBaseTrainingSessionDetails,
    newTrainingSession,
    updateTrainingSession,
    getSessionInProgress,
    getWeeklyTrainingSessions,
  };
}
