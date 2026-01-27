import Script from "next/script";

interface OrganizationSchema {
  name: string;
  url?: string;
  logo?: string;
  contactPoint?: {
    telephone?: string;
    email?: string;
  };
  address?: string;
  sameAs?: string[];
}

export function OrganizationStructuredData({ 
  name, 
  url, 
  logo, 
  contactPoint,
  address,
  sameAs 
}: OrganizationSchema) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Church",
    name,
    ...(url && { url }),
    ...(logo && { logo }),
    ...(contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        ...(contactPoint.telephone && { telephone: contactPoint.telephone }),
        ...(contactPoint.email && { email: contactPoint.email }),
        contactType: "customer service",
      },
    }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
      },
    }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchema {
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
}

export function ArticleStructuredData({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
}: ArticleSchema) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(description && { description }),
    ...(image && { image }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(author && {
      author: {
        "@type": "Person",
        name: author.name,
      },
    }),
    ...(publisher && {
      publisher: {
        "@type": "Organization",
        name: publisher.name,
        ...(publisher.logo && {
          logo: {
            "@type": "ImageObject",
            url: publisher.logo,
          },
        }),
      },
    }),
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface EventSchema {
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: {
    name?: string;
    address?: string;
  };
  image?: string;
  organizer?: {
    name: string;
  };
}

export function EventStructuredData({
  name,
  description,
  startDate,
  endDate,
  location,
  image,
  organizer,
}: EventSchema) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    ...(description && { description }),
    startDate,
    ...(endDate && { endDate }),
    ...(location && {
      location: {
        "@type": "Place",
        ...(location.name && { name: location.name }),
        ...(location.address && {
          address: {
            "@type": "PostalAddress",
            streetAddress: location.address,
          },
        }),
      },
    }),
    ...(image && { image }),
    ...(organizer && {
      organizer: {
        "@type": "Organization",
        name: organizer.name,
      },
    }),
  };

  return (
    <Script
      id="event-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
