import { useEffect, useRef } from "react";

export const SITE_NAME = "Melvina Igboanugo — The Education Enthusiast";
export const SITE_URL = "https://melvinaigboanugo.com";
export const DEFAULT_DESC =
  "Education leader, mentor, and learning strategist helping students, educators, and schools build strong literacy, clear expression, and systems that produce real learning outcomes.";
export const DEFAULT_OG_DESC = "Raising Readers. Building Thinkers. Transforming Education.";
export const DEFAULT_OG_IMAGE = "/opengraph.jpg";
export const TWITTER_HANDLE = "@melvinaigboanugo";

export interface SeoProps {
  title?: string;
  description?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalPath?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogType?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(name: string, content: string, property?: string) {
  const attr = property ? "property" : "name";
  const key = property || name;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function removeLink(rel: string) {
  const el = document.querySelector(`link[rel="${rel}"]`);
  if (el) el.remove();
}

function upsertJsonLd(data: Record<string, unknown> | Record<string, unknown>[], id?: string) {
  const scriptId = id || "seo-jsonld";
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = scriptId;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function useSeo(props: SeoProps) {
  const prev = useRef<SeoProps>({});

  useEffect(() => {
    const {
      title,
      description = DEFAULT_DESC,
      ogDescription = DEFAULT_OG_DESC,
      ogImage = DEFAULT_OG_IMAGE,
      canonicalPath,
      noindex,
      nofollow,
      ogType = "website",
      jsonLd,
    } = props;

    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

    upsertMeta("description", description);
    upsertMeta("og:title", document.title, "og:title");
    upsertMeta("og:description", ogDescription, "og:description");
    upsertMeta("og:image", ogImage, "og:image");
    upsertMeta("og:url", canonicalPath ? `${SITE_URL}${canonicalPath}` : SITE_URL, "og:url");
    upsertMeta("og:site_name", SITE_NAME, "og:site_name");
    upsertMeta("og:type", ogType, "og:type");
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:site", TWITTER_HANDLE);
    upsertMeta("twitter:title", document.title);
    upsertMeta("twitter:description", ogDescription);
    upsertMeta("twitter:image", ogImage);

    if (canonicalPath) {
      upsertLink("canonical", `${SITE_URL}${canonicalPath}`);
    } else {
      removeLink("canonical");
    }

    if (noindex) {
      upsertMeta("robots", nofollow ? "noindex, nofollow" : "noindex, follow");
    } else if (nofollow) {
      upsertMeta("robots", "index, nofollow");
    } else {
      upsertMeta("robots", "index, follow");
    }

    if (jsonLd) {
      upsertJsonLd(jsonLd);
    }

    prev.current = props;
  }, [props.title, props.description, props.ogDescription, props.ogImage, props.canonicalPath, props.noindex, props.nofollow, props.ogType, props.jsonLd]);
}
