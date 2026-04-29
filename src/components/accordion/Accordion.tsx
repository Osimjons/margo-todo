// Accordion.tsx
import React, { useState } from "react";
import "./Accordion.css";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion = ({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="accordion">
      <button className="accordion__header" onClick={toggleAccordion}>
        <span className="accordion__title">{title}</span>

        <span
          className={`accordion__icon ${isOpen ? "accordion__icon--open" : ""}`}
        >
          ▼
        </span>
      </button>

      <div
        className={`accordion__content ${
          isOpen ? "accordion__content--open" : ""
        }`}
      >
        <div className="accordion__body">{children}</div>
      </div>
    </div>
  );
};
