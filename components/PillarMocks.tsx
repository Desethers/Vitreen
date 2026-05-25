"use client";

import { motion } from "framer-motion";
import {
  StepOnePillIcon,
  StepTwoSharingFlow,
  DeployCardStack,
} from "@/components/ProcessFlow";

const ease = [0.16, 1, 0.3, 1] as const;

const auditTags = ["Artworks", "Artists", "Collectors", "Exhibitions", "CRM", "Email"];

/* ─── Step 01 — Audit ─── */
function AuditMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full w-full flex-col justify-center rounded-lg bg-white px-6 py-6"
    >
      <div className="flex flex-wrap gap-2">
        {auditTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E1E1DE] bg-white px-2.5 py-1 text-[11px] font-medium leading-none text-[#111110]"
          >
            <StepOnePillIcon tag={tag} />
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-5 text-[13px] leading-[1.6] text-[#425466]">
        We review how artworks and information already move across the gallery.
      </p>
    </motion.div>
  );
}

/* ─── Step 02 — Connect & build ─── */
function ConnectMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full w-full flex-col justify-center rounded-lg bg-white px-6 py-6"
    >
      <StepTwoSharingFlow />
      <p className="mt-4 text-[13px] leading-[1.6] text-[#425466]">
        Vitreen connects artwork files, selections and collector communication into one flow.
      </p>
    </motion.div>
  );
}

/* ─── Step 03 — Deploy ─── */
function DeployMock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease }}
      className="flex h-full w-full flex-col justify-center rounded-lg bg-white px-6 py-6"
    >
      <DeployCardStack lang="en" />
    </motion.div>
  );
}

/* ─── Pillars config ─── */
export const PILLARS = [
  {
    number: "01",
    title: "Audit",
    desc: "We review how artworks and information already move across the gallery.",
    Mock: AuditMock,
  },
  {
    number: "02",
    title: "Connect & build",
    desc: "Vitreen connects artwork files, selections and collector communication into one flow.",
    Mock: ConnectMock,
  },
  {
    number: "03",
    title: "Deploy",
    desc: "Operational infrastructure installed around your existing gallery environment.",
    Mock: DeployMock,
  },
];
