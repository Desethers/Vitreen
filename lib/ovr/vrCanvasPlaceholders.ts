import type { Block } from "./buildTypes";

export const VR_CANVAS_TEXT_BODY_PLACEHOLDER =
  "Ajoutez ici un texte d’accompagnement : présentez le contexte, les œuvres ou le fil narratif de ce viewing room.";

export const VR_CANVAS_QUOTE_BODY_PLACEHOLDER =
  "« Une citation qui résume l’esprit de cette sélection — remplacez ce texte par la vôtre. »";

export const VR_CANVAS_QUOTE_AUTHOR_PLACEHOLDER = "Auteur ou source";

export function vrCanvasNewQuoteContent(
  kind: "quote" | "text"
): Pick<Block, "quoteText" | "quoteAuthor"> {
  if (kind === "text") {
    return { quoteText: VR_CANVAS_TEXT_BODY_PLACEHOLDER, quoteAuthor: "" };
  }
  return {
    quoteText: VR_CANVAS_QUOTE_BODY_PLACEHOLDER,
    quoteAuthor: VR_CANVAS_QUOTE_AUTHOR_PLACEHOLDER,
  };
}

/** Vrai tant que le bloc « quote » contient encore le texte d’exemple ajouté depuis la preview. */
export function isVrCanvasQuotePlaceholder(
  block: Pick<Block, "type" | "quoteText" | "quoteAuthor" | "textStyle">
): boolean {
  if (block.type !== "quote") return false;
  if (block.textStyle === "text") {
    return block.quoteText === VR_CANVAS_TEXT_BODY_PLACEHOLDER && block.quoteAuthor === "";
  }
  return (
    block.quoteText === VR_CANVAS_QUOTE_BODY_PLACEHOLDER &&
    block.quoteAuthor === VR_CANVAS_QUOTE_AUTHOR_PLACEHOLDER
  );
}
