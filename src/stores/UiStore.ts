import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useUiStore = defineStore('ui', () => {
  const showNoteEditorDialog = ref(false);

  function setShowNotesEditorDialog(show: boolean) {
    showNoteEditorDialog.value = show;
  }

  return { showNoteEditorDialog, setShowNotesEditorDialog};
});