import { z } from "zod";

export type Faq = {
  id: number;
  question: string;
  answer: string;
};

export const COLUMNS = [
  { name: "Question", uid: "Question" },
  { name: "Answer", uid: "Answer" },
  { name: "Actions", uid: "actions" },
] as const;

export type ColumnKey = (typeof COLUMNS)[number]["uid"];

export const FAQS: Faq[] = [
  {
    id: 1,
    question: "What photography services do you offer?",
    answer: "We offer wedding, event, and portrait photography services.",
  },
  {
    id: 2,
    question: "How can I book a photography session?",
    answer:
      "You can book a session by contacting us through our website or phone.",
  },
  {
    id: 3,
    question: "Do you provide editing for the photos?",
    answer: "Yes, all photos include professional editing and retouching.",
  },
];

export interface FormHandle {
  submit: () => void;
}

export type FaqContextType = {
  faq: Faq[];
  filteredFaq: Faq[];
  search: string;
  setSearch: (value: string) => void;
  formRef: React.RefObject<FormHandle>;
  page: number;
  setPage: (page: number) => void;
  pages: number;
  isLoading: boolean;
};

export const PAGE_SIZE = 10;

export const FaqSchema = z.object({
  isPublished: z.boolean(),
  questionID: z.string().min(1, { message: "Question (ID) is required" }),
  answerID: z.string().min(1, { message: "Answer (ID) is required" }),
  questionEN: z.string().min(1, { message: "Question (EN) is required" }),
  answerEN: z.string().min(1, { message: "Answer (EN) is required" }),
});

export type FaqFormValues = z.infer<typeof FaqSchema>;
