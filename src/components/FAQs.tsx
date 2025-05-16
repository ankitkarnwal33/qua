"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I get paid?",
    answer:
      "Payments are processed monthly via UPI. Once your referral completes their registration and payment for a QUA Nutrition plan, your reward will be reflected on your dashboard. You can then request a payout through UPI.",
  },
  {
    question: "What qualifies as a successful referral?",
    answer:
      "A referral is considered successful when the person you referred completes their registration and purchases a personalized QUA Nutrition plan. Only valid and completed transactions are eligible for rewards.",
  },
  {
    question: "How quickly does status update?",
    answer:
      "Status is updated within 24–48 hours of the referral’s action. In many cases, updates are instant.",
  },
  {
    question: "Can I promote the program on social media?",
    answer:
      "Yes, feel free to use your referral link on any social media platform.",
  },
  {
    question: "Is there a limit to referrals?",
    answer:
      "No, you can refer as many people as you like. The more referrals you bring in, the more rewards you earn!",
  },
];

const ITEMS_PER_PAGE = 7;

export function FaqSection() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);
  const paginatedFaqs = faqs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <section className="py-12 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-3xl px-5 sm:px-10 mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Accordion
              type="single"
              collapsible
              className="w-full text-left space-y-2"
            >
              {paginatedFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              {"<"}
            </Button>
            <span className="text-sm text-muted-foreground">
              {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              {">"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
