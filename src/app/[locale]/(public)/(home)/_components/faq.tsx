"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import {
  ChevronDown,
  ChevronUp,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { useLocale } from "next-intl";

import { useFaq } from "../_hooks/use-faq";

export default function FaqSection() {
  const { data } = useFaq();
  const locale = useLocale();

  return (
    <div
      className="flex flex-col justify-center px-4 py-40  text-white"
      id="faq-section"
    >
      <div className="flex flex-col gap-2 ">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">FAQs</h2>
        <p className="text-neutral-400 max-w-3xl">
          Find answers to common questions about our services.
        </p>
      </div>
      {data?.data && data.data.length > 0 ? (
        data.data.map((faq) => {
          const localizedQuestion =
            locale === "en" ? faq.question_en : faq.question_id;
          const localizedAnswer =
            locale === "en" ? faq.answer_en : faq.answer_id;

          return (
            <Accordion
              key={faq.uuid}
              className="p-0 mt-4"
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    height: "auto",
                    overflowY: "unset",
                    transition: {
                      height: {
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 1,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 1,
                      },
                    },
                  },
                  exit: {
                    y: -10,
                    opacity: 0,
                    height: 0,
                    overflowY: "hidden",
                    transition: {
                      height: {
                        easings: "ease",
                        duration: 0.25,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 0.3,
                      },
                    },
                  },
                },
              }}
            >
              <AccordionItem
                aria-label={localizedQuestion}
                className="text-white p-0"
                indicator={({ isOpen }) =>
                  isOpen ? <ChevronUp className="rotate-90" /> : <ChevronDown />
                }
                title={
                  <span className="text-lg font-semibold">
                    {localizedQuestion}
                  </span>
                }
              >
                <span className="text-md text-neutral-300">
                  {localizedAnswer}
                </span>
              </AccordionItem>
            </Accordion>
          );
        })
      ) : (
        <div className="flex flex-col my-20 gap-2 items-center">
          <MessageCircleQuestionIcon className="size-10 text-white" />
          <h2 className="text-3xl font-semibold text-white">No Faq Yet</h2>
          <p className="text-muted-foreground max-w-md text-xl">
            No FAQs available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
