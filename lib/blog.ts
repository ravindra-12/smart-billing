export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

export const posts: BlogPost[] = [
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

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
