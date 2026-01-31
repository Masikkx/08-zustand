import NotesClient from '@/app/notes/filter/Notes.client';
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Metadata } from 'next';


type Props = {
  params: Promise<{ slug?: string[] }>;
};

type ValidTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

const isValidTag = (tag: string | undefined): tag is ValidTag => {
  const validTags: ValidTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  return !!tag && validTags.includes(tag as ValidTag);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0];

  return {
    title: `Notes - ${tag}`,
    description: `A collection of ${tag} notes on NoteHub.`,
    openGraph: {
      title: `Notes - ${tag}`,
      description: `A collection of ${tag} notes on NoteHub.`,
      url: `https://08-zustand-eight-pied.vercel.app/notes/filter/${tag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${tag} notes`,
        },
      ],
      type: "article",
    },
  };
}





const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tagParam = slug?.[0];
  
  const tag = isValidTag(tagParam) ? tagParam : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { tag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;