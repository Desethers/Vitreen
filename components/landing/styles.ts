/*
 * Shared class strings for the landing sections — exactly the tokens used on
 * main (Hero.tsx H1, ProcessFlow.tsx H2/subtitle): ink #111110, muted
 * #6B6A67, subtle #ADADAA, line #E8E8E6, surface-soft #F5F5F3, and the same
 * container/spacing pattern (`px-4 md:px-6` + `mx-auto max-w-7xl`).
 */

export const SECTION = "px-4 py-16 md:px-6 md:py-20";
export const CONTAINER = "mx-auto w-full max-w-7xl";

/** Same as the centred section kickers (ConversationSections KICKER): put the H2 20px under it (mt-5). */
export const EYEBROW = "text-[13px] tracking-[-0.01em] text-[#6B6A67]";

/** Same scale as the centred section headings (ConversationSections TITLE). */
export const H2 =
  "font-display text-[26px] font-medium leading-[1.1] tracking-[-0.03em] text-[#111110] md:text-[36px]";

/** Section subtitle, directly under H2 — same scale as ProcessFlow's. */
export const H2_SUB =
  "mt-2 font-display text-[26px] font-medium leading-[1.1] tracking-[-0.03em] text-[#ADADAA] md:text-[36px]";

export const H3 =
  "font-display text-[18px] font-normal leading-[1.25] tracking-[-0.02em] text-[#111110]";

export const BODY = "text-[15px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67] md:text-[17px]";

export const BODY_SM = "text-[14px] leading-[1.6] tracking-[-0.01em] text-[#6B6A67] md:text-[15px]";

/** A line that must land as a claim, not as description. */
export const LINE_INK =
  "text-[16px] leading-[1.45] tracking-[-0.02em] text-[#111110] md:text-[19px]";
