import NotesClient from "@/app/notes/filter/Notes.client";

type Props = {
  params: { slug?: string[] };
};

const NotesByCategory = ({ params }: Props) => {
  const tag = params.slug?.[0];

  return <NotesClient tag={tag} />;
};

export default NotesByCategory;
