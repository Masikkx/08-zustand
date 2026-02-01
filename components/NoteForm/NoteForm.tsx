'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';
import {
  useNoteDraftStore,
  initialDraft,
} from '../../app/lib/store/noteStore';

const TAGS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as const;
type TagType = (typeof TAGS)[number];

type NoteFormProps = {
  onCancel?: () => void;
};

export default function NoteForm({ onCancel }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const formValues = draft ?? initialDraft;

  const { mutateAsync: createNoteMutation } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();

      if (onCancel) onCancel();
      else router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setDraft({
      [name]: value,
    });
  };

  async function handleSubmit(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as TagType;

    await createNoteMutation({ title, content, tag });
  }

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.back();
  };

  return (
    <div className={css.modal}>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className={css.input}
            value={formValues.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            value={formValues.content}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            value={formValues.tag}
            onChange={handleChange}
            required
          >
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            onClick={handleCancel}
            className={css.cancelButton}
          >
            Cancel
          </button>

          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </form>
    </div>
  );
}
