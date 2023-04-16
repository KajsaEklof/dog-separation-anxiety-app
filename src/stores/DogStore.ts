import { defineStore } from 'pinia'
import { ref } from 'vue';

export interface IPet {
  id: string,
  name: string,
  targetDuration: string,
}

export interface ITrainingSession {
  id: string,
  warmups: number,
  targetDuration: string,
}

export const usePetStore = defineStore('pet', () => {
  const pet = ref({
    id: '',
    name: '',
    targetDuration: '',
  })

  const trainingSession = ref({
    id: '',
    warmups: 6,
    targetDuration: '',
  })

  function setPet(currentPet: IPet) {
    pet.value = currentPet;
  }

  function setTrainingSession(session: ITrainingSession) {
    trainingSession.value = session;
  }

  return { pet, trainingSession, setPet, setTrainingSession }
})
