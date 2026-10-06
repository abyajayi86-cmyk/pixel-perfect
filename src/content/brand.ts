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
  {
    label: "Excellence",
    tagline: "Pursuing the highest standards in learning, character and personal development.",
    icon: Award,
  },
  {
    label: "Nurturing",
    tagline:
      "Creating a caring, safe and supportive environment where every child is known, valued and loved.",
    icon: Heart,
  },
  {
    label: "Integrity",
    tagline: "Promoting honesty, respect and fairness in all relationships and decisions.",
    icon: ShieldCheck,
  },
  {
    label: "Compassion",
    tagline: "Encouraging empathy, kindness and respect for others.",
    icon: HandHeart,
  },
  {
    label: "Growth",
    tagline:
      "Cultivating curiosity, creativity and resilience so children embrace learning and challenges.",
    icon: Sprout,
  },
  {
    label: "Leadership",
    tagline: "Developing character, confidence and the skills to lead meaningfully.",
    icon: Sparkles,
  },
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
