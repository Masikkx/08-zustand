import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type NoteDraft = {
  title: string;
  content: string;
  tag: string;
};

type NoteDraftStore = {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
};

export const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage', 
    }
  )
);
