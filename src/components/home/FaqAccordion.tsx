"use client";

import { useState, ReactNode } from "react";
import { Shield, PenLine, FileText, HelpCircle, Lock } from "lucide-react";
import Image from "next/image";

// AccordionItem component
const AccordionItem = ({
  title,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  icon?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
      >
        <div className="flex items-center gap-2 text-gray-900 font-medium">
          {icon}
          {title}
        </div>
        <span className="text-xl text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="p-4 border-t text-gray-700 bg-gray-50">{children}</div>
      )}
    </div>
  );
};

// Accordion wrapper component
const Accordion = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

// Main FAQ Accordion component
const FaqAccordion = () => {
  return (
    <main className="flex  flex-col items-center justify-center  pt-6 ">
      <div className="w-full mx-auto">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold text-gray-900">
            Product Review Hub – FAQ
          </h1>
          <p className="text-lg text-gray-600">
            Answers to your most common questions about our platform
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          {/* Image Section */}
          <div className="w-full md:w-1/3 flex justify-center h-full">
            <Image
              src="/faq.svg"
              alt="FAQ Illustration"
              width={900}
              height={700}
              className="rounded-lg object-cover h-full w-full"
            />
          </div>

          {/* Accordion Section */}
          <div className="w-full md:w-2/3 h-full">
            <Accordion>
              <AccordionItem
                title="Are the reviews on Product Review Hub genuine?"
                defaultOpen
                icon={<Shield className="h-5 w-5" />}
              >
                <p className="mb-2">
                  <strong>Q:</strong> How do you ensure reviews are real?
                </p>
                <p className="mb-4">
                  <strong>A:</strong> All our reviews are submitted by verified
                  customers. We use order tracking and email verification to
                  confirm purchase before allowing a review.
                </p>
              </AccordionItem>

              <AccordionItem
                title="How do I write a product review on this website?"
                icon={<PenLine className="h-5 w-5" />}
              >
                <p className="mb-2">
                  <strong>Q:</strong> What's the process?
                </p>
                <p className="mb-4">
                  <strong>A:</strong> Simply log in, search for the product
                  you've purchased, and click "Write a Review." Verified
                  purchases will be labeled accordingly.
                </p>
              </AccordionItem>

              <AccordionItem
                title="What is your policy on negative reviews?"
                icon={<FileText className="h-5 w-5" />}
              >
                <p className="mb-2">
                  <strong>Q:</strong> Are negative reviews allowed?
                </p>
                <p className="mb-4">
                  <strong>A:</strong> Absolutely. We believe in honest feedback
                  — positive or negative — as long as it complies with our terms
                  and respectful conduct policy.
                </p>
              </AccordionItem>

              <AccordionItem
                title="I'm having trouble using the website — what should I do?"
                icon={<HelpCircle className="h-5 w-5" />}
              >
                <p className="mb-2">
                  <strong>Q:</strong> Who do I contact for help?
                </p>
                <p className="mb-4">
                  <strong>A:</strong> Reach out to our support team via the
                  "Contact Us" page. We usually respond within 24 hours.
                </p>
              </AccordionItem>

              <AccordionItem
                title="Is my data safe on Product Review Hub?"
                icon={<Lock className="h-5 w-5" />}
              >
                <p className="mb-2">
                  <strong>Q:</strong> How do you protect user data?
                </p>
                <p className="mb-4">
                  <strong>A:</strong> We use industry-standard encryption and
                  never share your personal information with third parties
                  without consent.
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FaqAccordion;
