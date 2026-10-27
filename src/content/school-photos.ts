import culturalPortrait from "@/assets/honeytots-cultural-portrait.jpg.asset.json";
import heritageGroup from "@/assets/honeytots-heritage-group.jpg.asset.json";
import uniformGroup from "@/assets/honeytots-uniform-group.jpg.asset.json";
import uniformShorts from "@/assets/honeytots-uniform-shorts.jpg.asset.json";
import uniformSkirt from "@/assets/honeytots-uniform-skirt.jpg.asset.json";
import traditionalAttire from "@/assets/honeytots-traditional-attire.jpg.asset.json";
import heritagePair from "@/assets/honeytots-heritage-pair.jpg.asset.json";
import heritagePortrait from "@/assets/honeytots-heritage-portrait.jpg.asset.json";

export type SchoolPhoto = { src: string; alt: string };

export const earlyYearsPhoto: SchoolPhoto = {
  src: culturalPortrait.url,
  alt: "A Honeytots pupil in traditional dress holding a green flower-decorated frame",
};

export const primaryPhoto: SchoolPhoto = {
  src: uniformGroup.url,
  alt: "A group of pupils wearing light-blue shirts and navy school uniform in a classroom",
};

export const culturePhotos: SchoolPhoto[] = [
  { src: heritageGroup.url, alt: "Honeytots pupils gathered in colourful Nigerian traditional clothing" },
  { src: traditionalAttire.url, alt: "A Honeytots pupil wearing a green striped traditional outfit and cap" },
  { src: heritagePair.url, alt: "Two Honeytots pupils celebrating in green and white traditional clothing" },
  { src: heritagePortrait.url, alt: "A Honeytots pupil in a white cap and green outfit holding a decorated frame" },
];

export const uniformPhotos: SchoolPhoto[] = [
  { src: uniformShorts.url, alt: "Navy school uniform shorts with an embroidered school monogram" },
  { src: uniformSkirt.url, alt: "A navy pleated school uniform skirt with an embroidered school monogram" },
];