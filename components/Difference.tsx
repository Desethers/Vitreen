"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Difference() {
  return (
    <section className="py-20 px-4 md:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-2xl md:text-3xl lg:text-4xl text-[#111110] leading-relaxed tracking-tight"
        >
          "The digital space is a natural extension of the gallery's storefront.{" "}
          <span>
            In the current era, a robust online program and dedicated strategy is
            essential in the art world."
          </span>
          <footer className="mt-8 flex items-center gap-4 not-italic">
            <img
              src="https://res.cloudinary.com/dqzqcuqf9/image/upload/v1772530245/vip-benefits-images/bztubujvn9fb0hhxyaxh.png"
              alt="Elena Soboleva"
              className="w-11 h-11 rounded-full object-cover flex-shrink-0 grayscale"
            />
            <div className="font-sans">
              <p className="text-sm font-medium text-[#111110] leading-tight">Elena Soboleva</p>
              <p className="text-xs text-[#ADADAA] mt-0.5">Global Head of Audience Growth & Intelligence, Art Basel</p>
            </div>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
