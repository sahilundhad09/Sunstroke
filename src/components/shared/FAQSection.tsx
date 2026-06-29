"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/motion/FadeIn";

interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

interface FAQSectionProps {
  items: readonly FAQItem[];
  className?: string;
}

export function FAQSection({ items, className = "" }: FAQSectionProps) {
  return (
    <FadeIn className={className}>
      <Accordion className="w-full space-y-3">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            className="rounded-xl border-2 border-black bg-white px-5 shadow-gumroad-sm data-[open]:bg-[#ffc700] transition-colors"
          >
            <AccordionTrigger className="py-4 text-left text-sm font-black text-black hover:text-zinc-700 transition-colors hover:no-underline sm:text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm font-bold leading-relaxed text-zinc-800">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </FadeIn>
  );
}
