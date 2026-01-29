import css from './home.module.css'
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "NoteHub",
    description: "This page could not be found.",
    openGraph: {
      title: "NoteHub",
      description: "This page could not be found.",
      url: "https://08-zustand-p6qvz852v-masikkx.vercel.app/",
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

const NotFound = () => {
  return (
    <div>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;

