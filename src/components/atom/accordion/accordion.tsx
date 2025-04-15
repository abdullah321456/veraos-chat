"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ title, children, className }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`w-full ${className}`}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-base text-black font-bold">{title}</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {/* Content */}
      <div
        className={`overflow-hidden mt-3 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}>
        {isOpen && children}
      </div>
    </div>
  );
}
