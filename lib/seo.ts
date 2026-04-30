import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nasiruddin.dev";
const SITE_NAME = "Nasir Uddin — Full Stack Engineer";
const DEFAULT_DESCRIPTION =
  "Frontend-focused Full Stack Engineer specializing in React, TypeScript, Next.js, and Node.js. Building enterprise-grade web applications and cross-platform mobile apps.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/nasir-uddin.webp`;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  path = "/",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | Nasir Uddin` : SITE_NAME;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@nrubel",
      site: "@nrubel",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function buildPersonSchema(profile: {
  name: string;
  headline: string;
  summary: string;
  url: string;
  image: string;
  email: string;
  location: string;
  socials: { url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.headline,
    description: profile.summary,
    url: profile.url,
    image: `${SITE_URL}${profile.image}`,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: profile.socials.map((s) => s.url),
  };
}
