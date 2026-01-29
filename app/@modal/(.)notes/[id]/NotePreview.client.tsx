"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./NoteModal.module.css";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.loading}>Завантаження нотатки...</div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.error}>
          <h2>Помилка завантаження</h2>
          <p>
            {error instanceof Error
              ? error.message
              : "Нотатку не знайдено"}
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.header}>
        <h2>{note.title}</h2>
        <span className={`${css.tag} ${css[note.tag.toLowerCase()]}`}>
          {note.tag}
        </span>
      </div>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>
        Створено: {new Date(note.createdAt).toLocaleDateString()}
      </p>
    </Modal>
  );
}
