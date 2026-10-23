import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/subjects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/mock-exam`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/auth/register`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  try {
    const subjects = await prisma.subject.findMany({
      include: { topics: { select: { id: true }, orderBy: { order: "asc" } } },
    });
    const dynamicPages: MetadataRoute.Sitemap = [];
    for (const s of subjects) {
      dynamicPages.push({
        url: `${SITE_URL}/subjects/${s.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
      for (const t of s.topics) {
        dynamicPages.push({
          url: `${SITE_URL}/subjects/${s.slug}/${t.id}/theory`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
    return [...staticPages, ...dynamicPages];
  } catch (err) {
    console.error("[sitemap] failed to load subjects", err);
    return staticPages;
  }
}
