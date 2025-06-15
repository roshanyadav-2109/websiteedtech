
"use client";
import React from "react";
import { motion } from "framer-motion";
import HighlightedText from "./HighlightedText";

type Testimonial = {
  text: string;
  name: string;
  role: string;
};

const keywordsToHighlight = [
  "paid batch",
  "non-maths background",
  "non maths background",
  "work full-time",
  "work full time",
  "free",
  "batch"
];

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          y: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full" key={i}>
                  <div>
                    <HighlightedText text={text} keywords={keywordsToHighlight} />
                  </div>
                  <div className="mt-5">
                    <div className="font-medium tracking-tight leading-5">{name}</div>
                    <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
