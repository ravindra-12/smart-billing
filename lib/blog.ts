export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  intro: string;
  content?: string;
  coverImage?: string | null;
  authorName?: string;
  tags?: string[];
  sections?: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "";

const fallbackPosts: BlogPost[] = [
  {
    slug: 'why-small-businesses-need-digital-billing',
    category: 'Business Growth',
    title: 'Why Small Businesses Need Digital Billing',
    excerpt:
      'Learn how digital billing helps small businesses save time, reduce mistakes, and understand their daily sales better.',
    date: 'July 20, 2026',
    readTime: '5 min read',
    intro:
      'For many small businesses, billing is still managed with handwritten notebooks, mental calculations, or a collection of disconnected apps. Digital billing brings these everyday tasks into one simple workflow so business owners can spend more time serving customers and less time fixing records.',
    sections: [
      {
        heading: 'Spend less time on repetitive work',
        paragraphs: [
          'Creating an invoice digitally takes seconds. Product details, prices, taxes, and totals can be reused instead of written from scratch for every customer.',
          'That time adds up over a busy week, especially when the same products are sold repeatedly or multiple people help at the counter.',
        ],
      },
      {
        heading: 'Reduce avoidable billing mistakes',
        paragraphs: [
          'Manual calculations make it easy to miss an item, add the wrong amount, or lose track of a payment. A digital bill calculates totals consistently and keeps the final record easy to check.',
        ],
      },
      {
        heading: 'Turn daily sales into useful information',
        paragraphs: [
          'A digital record does more than produce a receipt. It helps you see what sold, when sales were strongest, and which customers still have an outstanding balance.',
          'With that visibility, small decisions—such as restocking a popular product or following up on credit—become much easier.',
        ],
      },
    ],
  },
  {
    slug: 'qr-upi-payments-for-local-businesses',
    category: 'Payments',
    title: 'A Simple Guide to QR and UPI Payments for Local Businesses',
    excerpt:
      'Make payment collection easier for your customers with a simple, reliable QR and UPI workflow.',
    date: 'July 16, 2026',
    readTime: '4 min read',
    intro:
      'QR and UPI payments have made it easier for customers to pay quickly, but a smooth payment experience still depends on a clear process at the business end. A few simple habits can make collections faster and records more reliable.',
    sections: [
      {
        heading: 'Keep your QR code easy to find',
        paragraphs: [
          'Place the QR code where customers can scan it without asking for help. It should be well lit, large enough to scan, and connected to the account used for business collections.',
        ],
      },
      {
        heading: 'Confirm the payment before closing the sale',
        paragraphs: [
          'Ask customers to show the successful payment screen and check the amount and reference when needed. This small step prevents confusion caused by pending or failed transactions.',
        ],
      },
      {
        heading: 'Record digital payments with the bill',
        paragraphs: [
          'A payment record is most useful when it is connected to the sale it settled. Marking the bill as paid helps you compare collections with sales at the end of the day.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-track-udhaar-without-confusion',
    category: 'Shop Management',
    title: 'How to Track Udhaar Without Confusion',
    excerpt:
      'Practical ways to keep customer credit records organised and improve follow-ups without manual notebooks.',
    date: 'July 12, 2026',
    readTime: '6 min read',
    intro:
      'Udhaar can help build strong customer relationships, but unclear records create stress for both sides. The key is to make every credit sale easy to trace from the first bill to the final payment.',
    sections: [
      {
        heading: 'Create one record for each customer',
        paragraphs: [
          'Keep a customer name and phone number with each credit transaction. This avoids mixing up customers with similar names and gives you a reliable way to follow up.',
        ],
      },
      {
        heading: 'Write down every payment',
        paragraphs: [
          'Partial payments should be recorded as soon as they are received. Showing the original amount, payments made, and remaining balance keeps the conversation transparent.',
        ],
      },
      {
        heading: 'Follow up with a clear, friendly message',
        paragraphs: [
          'Regular reminders are easier when you know the exact outstanding amount and the date of the original sale. A short, polite message is usually more effective than waiting until several bills pile up.',
        ],
      },
    ],
  },
];

function ensureFullUrl(url: string | null) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const base = STRAPI_URL.replace(/\/$/, "");
  if (!base) return url;
  return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
}

function normalizeImageUrl(image: any): string | null {
  if (!image) return null;
  const url = image.url || image?.data?.attributes?.url || image?.formats?.large?.url || image?.formats?.medium?.url;
  return ensureFullUrl(url || null);
}

function formatDate(dateValue?: string) {
  if (!dateValue) return "Recent";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function estimateReadTime(content?: string) {
  const plainText = content ? content.replace(/<[^>]*>/g, " ").replace(/[#*_`\[\]()]/g, " ") : "";
  const words = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
  const minutes = Math.max(3, Math.ceil(words / 180));
  return `${minutes} min read`;
}

function normalizePost(item: any): BlogPost {
  const rawContent = item.content || "";
  const excerpt = item.excerpt || rawContent.replace(/<[^>]*>/g, " ").slice(0, 180);
  const slug = item.slug || item.documentId || "";

  return {
    slug,
    category: item.category?.name || "General",
    title: item.title || "Untitled article",
    excerpt: excerpt.trim(),
    date: formatDate(item.publishedAt),
    readTime: item.readTime ? `${item.readTime} min read` : estimateReadTime(rawContent),
    intro: item.excerpt || item.title,
    content: rawContent,
    coverImage: normalizeImageUrl(item.coverImage),
    authorName: item.author?.name || "Smart Billing Lite",
    tags: Array.isArray(item.tags) ? item.tags.map((tag: any) => tag.name).filter(Boolean) : [],
    sections: [],
  };
}

export const posts: BlogPost[] = fallbackPosts;

export async function getPosts(): Promise<BlogPost[]> {
  if (!STRAPI_URL) return fallbackPosts;

  try {
    const requestUrl = `${STRAPI_URL}/api/blog-posts?populate[coverImage][populate]=*&populate[author][populate]=*&populate[category][populate]=*&populate[tags][populate]=*&sort[0]=publishedAt:desc`;
    const res = await fetch(requestUrl, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return fallbackPosts;

    const json = await res.json();
    const allPosts = Array.isArray(json?.data) ? json.data : [];

    if (!allPosts.length) return fallbackPosts;

    return allPosts.map(normalizePost);
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return fallbackPosts;
  }
}

export async function getPost(slug: string) {
  if (!STRAPI_URL) {
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }

  try {
    const requestUrl = `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[coverImage][populate]=*&populate[author][populate]=*&populate[category][populate]=*&populate[tags][populate]=*`;
    const res = await fetch(requestUrl, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return fallbackPosts.find((post) => post.slug === slug) ?? null;
    }

    const json = await res.json();
    const item = Array.isArray(json?.data) ? json.data[0] : null;

    return item ? normalizePost(item) : fallbackPosts.find((post) => post.slug === slug) ?? null;
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return fallbackPosts.find((post) => post.slug === slug) ?? null;
  }
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractTableOfContents(content?: string) {
  if (!content) return [];

  const headings: Array<{ level: number; title: string; slug: string }> = [];
  const seen = new Map<string, number>();

  content.replace(/^(#{1,6})\s+(.*)$/gm, (_, hashes: string, title: string) => {
    const cleanTitle = title.trim();
    const baseSlug = slugifyHeading(cleanTitle);
    const count = seen.get(baseSlug) ?? 0;
    seen.set(baseSlug, count + 1);
    headings.push({
      level: hashes.length,
      title: cleanTitle,
      slug: count ? `${baseSlug}-${count + 1}` : baseSlug,
    });
    return "";
  });

  return headings;
}

export function renderBlogContent(content?: string) {
  if (!content) return "<p>Content coming soon.</p>";

  const escaped = content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const withHeadings = escaped.replace(/^(#{1,6})\s+(.*)$/gm, (_, hashes: string, title: string) => {
    const level = Math.min(6, Math.max(1, hashes.length));
    const slug = slugifyHeading(title.trim());
    return `<h${level} id="${slug}">${title.trim()}</h${level}>`;
  });

  const blocks = withHeadings.split(/\n\s*\n/).map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    if (/^<h[1-6]/.test(trimmed)) {
      return trimmed;
    }

    return `<p>${trimmed
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[(.+?)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
      .replace(/\n/g, "<br />")}</p>`;
  });

  return blocks.join("");
}
