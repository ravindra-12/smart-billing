import type { Metadata } from "next";
import LandingPages from "./LandingPages";
import { getHomeMeta } from "../lib/strapi";


export async function generateMetadata(): Promise<Metadata> {

  const homeMeta = await getHomeMeta();

  return {
    title: homeMeta.seo.metaTitle,
    description: homeMeta.seo.metaDescription,

    openGraph: {
      title: homeMeta.seo.metaTitle,
      description: homeMeta.seo.metaDescription,
      url: homeMeta.seo.canonicalUrl,
      images: homeMeta.seo.shareImage?.url 
        ? [homeMeta.seo.shareImage.url]
        : []
    }
  };
}


export default async function HomeRoute(){

 const homeMeta = await getHomeMeta();

 return (
    <LandingPages 
       homeMeta={homeMeta}
    />
 );

}