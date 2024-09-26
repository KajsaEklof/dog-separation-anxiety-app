import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useUiStore = defineStore('ui', () => {
  const showNoteEditorDialog = ref(false);
  const showMedicineDialog = ref(false);

  function setShowNotesEditorDialog(show: boolean) {
    showNoteEditorDialog.value = show;
  }
  
  function setShowMedicineDialog(show: boolean) {
    showMedicineDialog.value = show;
  }

  return {
    showNoteEditorDialog,
    showMedicineDialog,
    setShowNotesEditorDialog,
    setShowMedicineDialog};
});