import { supabase } from "@/supabase";

export interface INoteData {
    [x: string]: any;
}

export interface IAddNoteOptions {
    id: string
    title: string;
    content: string;
    pet_id: string;
}

// This file will contain the logic for all CRUD functions for the notes from the database.
export default function useNotes() {
  const getNotes = async (petId: string): Promise<INoteData[] | null> => {
    // get the notes from Supabase
    const call = await supabase.from('notes').select('*').eq('pet_id', petId);
    const data = call.data;

    return data;
  };

  const createOrUpdateNote = async ( options: IAddNoteOptions) => {
    const call = await supabase.from('notes').upsert({
        id: options.id,
        title: options.title,
        content: options.content,
        pet_id: options.pet_id,
        updated_at: new Date().toISOString(),
      });

    if (call.error) {
      throw new Error(call.error.message);
    }
  };

  const deleteNote = async (id: string) => {
    const call = await supabase.from('notes').delete().eq('id', id);

    if (call.error) {
      throw new Error(call.error.message);
    }
  };

  return { getNotes, createOrUpdateNote, deleteNote };
}