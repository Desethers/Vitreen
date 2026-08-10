"use client";

import {
  InventorySetupSection,
  type InventorySetupCopy,
} from "@/components/landing/LandingInventorySetup";

/* Mêmes mockups que la version EN — seuls les textes changent (voir §6 i18n). */
const FR_COPY: InventorySetupCopy = {
  eyebrow: "Votre inventaire",
  title: "Faites entrer votre base d’œuvres dans Vitreen.",
  body: "Après un audit de votre façon de travailler, nous prenons en charge la migration de vos données dans la base Vitreen, pour faire mieux circuler images et informations dans tout l’outil.",
  reassurances: ["Migration incluse", "Vos données restent confidentielles"],
};

export default function LandingInventorySetupFr() {
  return <InventorySetupSection copy={FR_COPY} />;
}
