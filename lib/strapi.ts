const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function getHomeMeta() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/home-meta?populate[seo][populate]=*&populate[geo][populate]=*`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch Home Meta:", res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error fetching Home Meta:", err);
    return null;
  }
}