const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export async function getHomeMeta() {
  const res = await fetch(
    `${STRAPI_URL}/api/home-meta?populate[seo][populate]=*&populate[geo][populate]=*`,
    {
      next:{
        revalidate:60
      }
    }
  );


  if(!res.ok){
    throw new Error("Failed to fetch Home Meta");
  }


  const json = await res.json();

  return json.data;
}