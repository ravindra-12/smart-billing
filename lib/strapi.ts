const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "";

const META_POPULATE = "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*";

// Full populate string for the feature page (includes hero, feature groups,
// hardware, highlights, workspace and nested items).
const FEATURE_PAGE_POPULATE =
  "populate[seo][populate]=*&populate[geo][populate]=*&populate[aeo][populate]=*&populate[hero][populate]=*&populate[featureGroups][populate][items][populate]=*&populate[hardware][populate][items][populate]=*&populate[highlights][populate][aiItems][populate]=*&populate[highlights][populate][businessItems]=*&populate[workspace][populate][cards][populate][features]=*";

interface StrapiImageField {
  url?: string;
  data?: {
    attributes?: {
      url?: string;
      formats?: { thumbnail?: { url?: string } };
    };
  };
}

function extractImageUrl(img: string | StrapiImageField | null | undefined) {
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

async function fetchPageMeta(page: string, populate?: string) {
  if (!STRAPI_URL) {
    console.error("Missing STRAPI API base URL.");
    return null;
  }

  try {
    const populateQuery = populate ?? META_POPULATE;

    const res = await fetch(`${STRAPI_URL}/api/${page}?${populateQuery}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) {
      // A 403 means this content type isn't public in Strapi yet (e.g. only "home"
      // has public find access today) — expected and already handled via the null
      // fallback below, so it shouldn't surface as a console error on every page.
      if (res.status !== 403) {
        console.error(`Failed to fetch ${page}:`, res.status, res.statusText);
      }
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

export async function getPageMeta(page: string, populate?: string) {
  return await fetchPageMeta(page, populate);
}

export async function getHomeMeta() {
  return await fetchPageMeta("home-meta");
}
