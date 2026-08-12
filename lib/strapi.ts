const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "";

const META_POPULATE = "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*";

function extractImageUrl(img: any) {
  if (!img) return null;
  if (typeof img === "string") return img;
  if (img.url) return img.url;
  if (img.data?.attributes?.url) return img.data.attributes.url;
  if (img.data?.attributes?.formats?.thumbnail?.url) return img.data.attributes.formats.thumbnail.url;
  return null;
}

function ensureFullUrl(url: string | null) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const base = STRAPI_URL.replace(/\/$/, "");
  if (!base) return url;
  return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
}

async function fetchPageMeta(page: string) {
  if (!STRAPI_URL) {
    console.error("Missing STRAPI API base URL.");
    return null;
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/${page}?${META_POPULATE}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${page}:`, res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    const data = json.data ?? null;

    if (!data) return null;

    const seoRaw = data.seo ?? null;
    const geoRaw = data.geo ?? null;
    const aeoRaw = data.aeo ?? null;

    const normalizedSeo = seoRaw
      ? {
          ...seoRaw,
          canonicalUrl: seoRaw.canonicalUrl || null,
          shareImage: ensureFullUrl(extractImageUrl(seoRaw.shareImage)),
        }
      : null;

    const normalizedGeo = geoRaw
      ? {
          ...geoRaw,
          canonicalUrl: geoRaw.canonicalUrl || null,
        }
      : null;

    const normalizedAeo = aeoRaw
      ? {
          ...aeoRaw,
          image: ensureFullUrl(extractImageUrl(aeoRaw.image)),
        }
      : null;

    return {
      ...data,
      seo: normalizedSeo,
      geo: normalizedGeo,
      aeo: normalizedAeo,
    };
  } catch (err) {
    console.error(`Error fetching ${page}:`, err);
    return null;
  }
}

export async function getPageMeta(page: string) {
  return await fetchPageMeta(page);
}

export async function getHomeMeta() {
  return await fetchPageMeta("home-meta");
}
