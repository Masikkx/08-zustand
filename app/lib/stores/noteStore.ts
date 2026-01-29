import { create } from 'zustand';
import { NewNoteData } from '../../../lib/api';

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (note: NewNoteData) => void;
  clearDraft: () => void;
};

// Під API потрібні поля: title, content, tag
const initialDraft: NewNoteData = {
  title: '',
  content: '',
  tag: 'Todo', // обов’язково, бо API очікує одну з 5 категорій
};

export const useNoteDraftStore = create<NoteDraftStore>((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}));
