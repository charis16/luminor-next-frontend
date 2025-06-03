"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import {
  ChevronDown,
  ChevronUp,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useFaq } from "../../_hooks/use-faq";

export default function FaqSection() {
  const { data } = useFaq();
  const locale = useLocale();
  const t = useTranslations("home");

  return (
    <div
      className="relative flex flex-col gap-6 w-full my-14 md:my-24"
      id="faq-section"
    >
      <div className="flex flex-col gap-2 pl-6">
        <h2 className="text-xl md:text-4xl font-bold text-foreground">
          {t("faqs")}
        </h2>
        <h4 className="text-neutral-400 text-lg md:max-w-3xl">
          {t("faqDesc")}
        </h4>
      </div>

      {data?.data && data.data.length > 0 ? (
        data.data.map((faq) => {
          const localizedQuestion =
            locale === "en" ? faq.question_en : faq.question_id;
          const localizedAnswer =
            locale === "en" ? faq.answer_en : faq.answer_id;

          return (
            <div key={faq.uuid} className="w-full px-8">
              <Accordion
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
                    isOpen ? (
                      <ChevronUp className="rotate-90" />
                    ) : (
                      <ChevronDown />
                    )
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
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center">
            <MessageCircleQuestionIcon className="text-muted-foreground size-14" />
          </div>
          <h2 className="text-xl md:text-3xl font-semibold text-white">
            {t("noFaqs")}
          </h2>
          <h4 className="text-neutral-400 max-w-md text-xl">
            {t("noFaqsYet")}
          </h4>
        </div>
      )}
    </div>
  );
}
