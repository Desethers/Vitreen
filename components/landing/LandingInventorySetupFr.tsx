"use client";

import {
  InventorySetupSection,
  type InventorySetupCopy,
} from "@/components/landing/LandingInventorySetup";

/* Mêmes mockups que la version EN — seuls les textes changent (voir §6 i18n). */
const FR_COPY: InventorySetupCopy = {
  eyebrow: "Votre inventaire",
  title: "Gardez la base que vous avez déjà.",
  body: "Vitreen peut s’installer par-dessus un inventaire existant. Si votre système fonctionne déjà pour vos données, rien ne justifie de le remplacer pour améliorer vos workflows de vente.",
  reassurances: ["Migration non imposée", "Vos données restent confidentielles"],
};

export default function LandingInventorySetupFr() {
  return <InventorySetupSection copy={FR_COPY} />;
}
