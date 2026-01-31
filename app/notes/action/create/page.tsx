import type { Metadata } from "next";
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Create Note - NoteHub",
    description: "A platform to share your notes with the world.",
    openGraph: {
      title: "Create Note - NoteHub",
      description: "A platform to share your notes with the world.",
      url: "https://08-zustand-eight-pied.vercel.app/notes/action/create",
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}

const CreateNote = async () => {
  return  (
  <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
      <NoteForm/>
  </div>
</main>
  )
};

export default CreateNote;
