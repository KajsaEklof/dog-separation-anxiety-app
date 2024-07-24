import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface IPet {
  id: string;
  name: string;
  weight: string;
  breed: string;
  age: string;
  sex: string;
  targetDuration: string;
}

export interface ITrainingSession {
  id: string;
  warmups: number;
  targetDuration: string;
}

export const useDogStore = defineStore('dog', () => {
  // * Store State
  const pet = ref({
    id: '',
    name: '',
    targetDuration: '',
    weight: '',
    breed: '',
    age: '',
    sex: '',
  });
  const trainingSession = ref({
    id: '',
    warmups: 6,
    targetDuration: '',
  });
  const showDogDetailsDialog = ref(false);


  // * Store Actions
  function setPet(currentPet: IPet) {
    pet.value = currentPet;
  }
  function setTrainingSession(session: ITrainingSession) {
    trainingSession.value = session;
  }
  function setShowDogDetailsDialog(show: boolean) {
    showDogDetailsDialog.value = show;
  }

  return { pet, trainingSession, showDogDetailsDialog, setPet, setTrainingSession, setShowDogDetailsDialog };
});
