import { supabase } from "@/supabase";

export interface IWeightData {
    [x: string]: any;
}

export interface IAddEntryOptions {
    petId: string;
    weight: number;
    createdAt: string;
}

// This file will contain the logic for all CRUD functions for the weight entries from the database.
export default function useHealthWeight() {
  const getWeightEntries = async (petId: string) => {
    // get the weight entries from Supabase
    const { data, error } = await supabase
    .from('health_weight')
    .select('weight, created_at')
    .eq('pet_id', petId)
    .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching weight entries:', error.message);
    } else {
      // console.log('Weight entries:', data);
    }

    return data;
  };

  const addEntry = async ( options: IAddEntryOptions) => {
    const call = await supabase.from('health_weight').insert({
        pet_id: options.petId,
        weight: options.weight,
        created_at: options.createdAt,
      });

    if (call.error) {
      throw new Error(call.error.message);
    }
    return call;
  };

  // const deleteEntry = async (id: string) => {
  //   const call = await supabase.from('notes').delete().eq('id', id);

  //   if (call.error) {
  //     throw new Error(call.error.message);
  //   }
  // };

  return { getWeightEntries, addEntry, }; //deleteEntry
}