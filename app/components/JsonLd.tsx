interface JsonLdProps {
  data: any;
}

export default function JsonLd({ data }: JsonLdProps) {

  const seo = data?.seo;
  const geo = data?.geo;


  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": seo?.metaTitle,
      "description": seo?.metaDescription,
      "url": seo?.canonicalUrl
    },


    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Smart Billing Lite",
      "url": seo?.canonicalUrl,
      "description": seo?.metaDescription
    },


    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Smart Billing Lite",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": geo?.aiSummary?.[0]
        ?.children?.[0]
        ?.text || seo?.metaDescription,

      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    },


    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": geo?.faqs?.map((faq:any)=>({

        "@type":"Question",

        "name":faq.question,

        "acceptedAnswer":{
          "@type":"Answer",
          "text":
          faq.answer?.[0]
          ?.children?.[0]
          ?.text || ""
        }

      })) || []
    }

  ];


  return (
    <>
      {
        schemas.map((schema,index)=>(
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema)
            }}
          />
        ))
      }
    </>
  );
}