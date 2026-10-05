import type { LucideIcon } from "lucide-react";
import { Award, Heart, ShieldCheck, HandHeart, Sprout, Sparkles } from "lucide-react";
import earlyYearsImage from "@/assets/stage-early-years.jpg";
import primaryImage from "@/assets/stage-primary.jpg";

export type BrandValue = {
  label: string;
  tagline: string;
  icon: LucideIcon;
};

export const BRAND_VALUES: BrandValue[] = [
  { label: "Excellence", tagline: "Every child can do their best.", icon: Award },
  { label: "Nurturing", tagline: "Warmth, care and safety first.", icon: Heart },
  { label: "Integrity", tagline: "Honest, consistent, trustworthy.", icon: ShieldCheck },
  { label: "Compassion", tagline: "We look out for each other.", icon: HandHeart },
  { label: "Growth", tagline: "Small steps build big progress.", icon: Sprout },
  { label: "Leadership", tagline: "Confident leaders, from the earliest years.", icon: Sparkles },
];

export type LearningStageCard = {
  image: string;
  title: string;
  text: string;
  to: string;
  shape: "arch" | "circle";
};

export const LEARNING_STAGES: LearningStageCard[] = [
  {
    image: earlyYearsImage,
    title: "Early Years & Nursery",
    text: "Play-based learning that builds curiosity and confidence.",
    to: "/learning/early-years",
    shape: "arch",
  },
  {
    image: primaryImage,
    title: "Primary School",
    text: "Strong foundations from Primary 1 to Primary 6.",
    to: "/learning/primary",
    shape: "circle",
  },
];

export type JourneyStep = {
  title: string;
  text: string;
};

export type FAQItem = {
  question: string;
  answer: string[];
};
