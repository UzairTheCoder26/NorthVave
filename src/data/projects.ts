export type Project = {
  name: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
  /** Same-origin path e.g. `/portfolio-thumbnails/foo.png` — instant card image; optional */
  thumbnail_url?: string | null;
};

/** Default category list (admin dropdown + filter order). Unknown DB categories are appended automatically. */
export const PROJECT_CATEGORY_PRESETS = [
  "Healthcare",
  "E-Commerce",
  "SaaS",
  "Real Estate",
  "Fashion",
  "Community",
  "Coaching",
] as const;
