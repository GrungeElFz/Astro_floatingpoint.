import defineRobotsTxt from "astro-robots-txt";

export const GET = defineRobotsTxt({
  policy: [
    {
      userAgent: "*",
      allow: "/",
    },
  ],
  sitemap: true,
});
