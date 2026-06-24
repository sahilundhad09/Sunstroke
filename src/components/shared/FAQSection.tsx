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
            className="rounded-xl border border-sunstroke-border bg-sunstroke-surface/30 px-5 backdrop-blur-sm data-[open]:border-sunstroke-cyan/20 data-[open]:bg-sunstroke-surface/50 transition-colors"
          >
            <AccordionTrigger className="py-4 text-left text-sm font-semibold text-white hover:text-sunstroke-cyan transition-colors hover:no-underline sm:text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-sunstroke-text-muted">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </FadeIn>
  );
}
