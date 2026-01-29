// "use client";

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import css from "./NoteForm.module.css";
// import { createNote } from "../../lib/api";

// const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;
// type TagType = (typeof TAGS)[number];

// const NoteSchema = Yup.object({
//   title: Yup.string()
//     .min(3, "Minimum 3 characters")
//     .max(50, "Maximum 50 characters")
//     .required("Required"),
//   content: Yup.string().max(500, "Maximum 500 characters"),
//   tag: Yup.mixed<TagType>()
//     .oneOf([...TAGS] as const)
//     .required("Required"),
// });

// interface NoteFormProps {
//   onCancel: () => void;
// }

// interface FormValues {
//   title: string;
//   content: string;
//   tag: TagType;
// }

// export default function NoteForm({ onCancel }: NoteFormProps) {
//   const queryClient = useQueryClient();

//   const { mutate, isPending } = useMutation({
//     mutationFn: createNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       onCancel();
//     },
//   });

//   const initialValues: FormValues = {
//     title: "",
//     content: "",
//     tag: "Todo",
//   };

//   return (
//     <Formik<FormValues>
//       initialValues={initialValues}
//       validationSchema={NoteSchema}
//       onSubmit={(values, { resetForm }) => {
//         mutate({
//           title: values.title,
//           content: values.content,
//           tag: values.tag,
//         });
//         resetForm();
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form className={css.form}>
//           <div className={css.formGroup}>
//             <label htmlFor="title">Title</label>
//             <Field
//               id="title"
//               name="title"
//               type="text"
//               className={css.input}
//             />
//             <ErrorMessage
//               name="title"
//               component="span"
//               className={css.error}
//             />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="content">Content</label>
//             <Field
//               id="content"
//               name="content"
//               as="textarea"
//               rows={8}
//               className={css.textarea}
//             />
//             <ErrorMessage
//               name="content"
//               component="span"
//               className={css.error}
//             />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="tag">Tag</label>
//             <Field
//               id="tag"
//               name="tag"
//               as="select"
//               className={css.select}
//             >
//               {TAGS.map((tag) => (
//                 <option key={tag} value={tag}>
//                   {tag}
//                 </option>
//               ))}
//             </Field>
//             <ErrorMessage
//               name="tag"
//               component="span"
//               className={css.error}
//             />
//           </div>

//           <div className={css.actions}>
//             <button
//               type="button"
//               onClick={onCancel}
//               className={css.cancelButton}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={css.submitButton}
//               disabled={isPending || isSubmitting}
//             >
//               {isPending ? "Creating..." : "Create note"}
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }



// 2nd version of NoteForm.tsx
// 'use client';

// import { useRouter } from 'next/navigation';
// import { createNote } from '@/lib/api';
// import css from './NoteForm.module.css';

// const TAGS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

// const NoteForm = () => {
//   const router = useRouter();

//   const handleCancel = () => {
//     router.push('/notes/filter/all');
//   };

//   const handleSubmit = async (formData: FormData) => {
//     const values = Object.fromEntries(formData);

//     await createNote({
//       title: values.title as string,
//       content: values.content as string,
//       tag: values.tag as string,
//     });

//     router.push('/notes/filter/all');
//   };

//   return (
//     <div className={css.modal}>
      
//     <form className={css.form} action={handleSubmit}>
//       <div className={css.formGroup}>
//         <label htmlFor="title">Title</label>
//         <input
//           id="title"
//           name="title"
//           type="text"
//           className={css.input}
//           required
//         />
//       </div>

//       <div className={css.formGroup}>
//         <label htmlFor="content">Content</label>
//         <textarea
//           id="content"
//           name="content"
//           rows={8}
//           className={css.textarea}
//         ></textarea>
//       </div>

//       <div className={css.formGroup}>
//         <label htmlFor="tag">Tag</label>
//         <select id="tag" name="tag" className={css.select} required>
//           {TAGS.map(tag => (
//             <option key={tag} value={tag}>
//               {tag}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={css.actions}>
//         <button
//           type="button"
//           onClick={handleCancel}
//           className={css.cancelButton}
//         >
//           Cancel
//         </button>
//         <button type="submit" className={css.submitButton}>
//           Create
//         </button>
//       </div>
//     </form>
//       </div>
//   );
// };

// export default NoteForm;



// 3rd version of NoteForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import { createNote, NewNoteData } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { useNoteDraftStore } from '../../app/lib/stores/noteStore';

const TAGS = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

const NoteForm = () => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newNoteData: NewNoteData = {
      title: draft?.title || '',
      content: draft?.content || '',
      tag: draft?.tag || 'Todo',
    };

    mutate(newNoteData);
  };

  const handleCancel = () => router.push('/notes/filter/all');

  return (
    <div className={css.modal}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className={css.input}
            value={draft?.title || ''}
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
            value={draft?.content || ''}
            onChange={handleChange}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            value={draft?.tag || 'Todo'}
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
          <button type="button" onClick={handleCancel} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
