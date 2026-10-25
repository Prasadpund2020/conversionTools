import type { MetadataRoute } from "next";

const BASE_URL = "https://freeconvertingtools.co.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/tools/", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
