import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://example.com",
      lastModified: new Date(),
    },
    {
      url: "https://example.com/about",
      lastModified: new Date(),
    },
  ];
}