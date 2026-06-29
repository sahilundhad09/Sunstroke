export const siteConfig = {
  name: "Sunstroke",
  description:
    "Sunstroke builds AI-powered tools, digital products, and curates the best software for creators and indie builders.",
  url: "https://sunstroke.dev",
  ogImage: "https://sunstroke.dev/og.png",
  creator: "Sunstroke",
  links: {
    linkedin: "https://www.linkedin.com/in/sunstroke-ai-30203b416/",
    instagram: "https://www.instagram.com/sunstroke09/",
    pinterest: "https://in.pinterest.com/sahilundhad09/",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Tools", href: "/tools" },
  { label: "Products", href: "/products" },
  { label: "Recommend", href: "/recommend" },
  { label: "Newsletter", href: "/newsletter" },
] as const;

export const footerLinks = {
  product: [
    { label: "Tools", href: "/tools" },
    { label: "Products", href: "/products" },
    { label: "Recommend", href: "/recommend" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export const trustBadges = [
  { label: "AI Tools Built", value: "10+" },
  { label: "Newsletter Subscribers", value: "1,000+" },
  { label: "Creators Served", value: "500+" },
  { label: "Products Launched", value: "5+" },
] as const;

export const pillars = [
  {
    title: "Build",
    subtitle: "AI Tools & Software",
    description:
      "I build intelligent tools that help creators and indie builders work faster, automate workflows, and ship products with confidence.",
    href: "/tools",
    cta: "Explore Tools",
    icon: "wrench" as const,
    accent: "cyan" as const,
  },
  {
    title: "Sell",
    subtitle: "Digital Products",
    description:
      "Premium digital products — templates, guides, and resources designed to help you grow your business and master modern tools.",
    href: "/products",
    cta: "Browse Products",
    icon: "package" as const,
    accent: "blue" as const,
  },
  {
    title: "Recommend",
    subtitle: "Curated Tools & Software",
    description:
      "Handpicked tools and software I personally use and trust. Every recommendation is battle-tested in real creator workflows.",
    href: "/recommend",
    cta: "See Recommendations",
    icon: "star" as const,
    accent: "violet" as const,
  },
] as const;

export const featuredTools = [
  {
    id: "1",
    name: "AI Content Engine",
    tagline: "Write · Optimize · Distribute",
    description:
      "Generate, optimize, and distribute content across platforms with AI-powered automation. 10x your output without sacrificing quality.",
    status: "live" as const,
    tags: ["Content", "AI", "Automation"],
    href: "#",
    icon: "⚡",
  },
  {
    id: "2",
    name: "Smart SEO Analyzer",
    tagline: "Rank Higher, Faster",
    description:
      "Deep-dive SEO audits powered by AI with actionable improvement recommendations and competitor analysis.",
    status: "beta" as const,
    tags: ["SEO", "Analytics", "AI"],
    href: "#",
    icon: "🔍",
  },
  {
    id: "3",
    name: "Creator CRM",
    tagline: "Manage Your Network",
    description:
      "Manage collaborations, track leads, and grow your creator network intelligently with AI-assisted insights.",
    status: "coming-soon" as const,
    tags: ["CRM", "Business", "Network"],
    href: "#",
    icon: "🤝",
  },
] as const;

export const featuredProducts = [
  {
    id: "1",
    name: "The Creator's AI Playbook",
    description:
      "A comprehensive guide to leveraging AI tools for content creation, automation, and growth. 80+ pages of actionable strategies.",
    price: 29 as number | "free",
    href: "#",
    badge: "Bestseller",
    tags: ["Guide", "AI", "Strategy"],
    rating: 4.9,
  },
  {
    id: "2",
    name: "Notion Creator Dashboard",
    description:
      "All-in-one Notion workspace for managing content, projects, and revenue. Plug-and-play for any creator workflow.",
    price: 19 as number | "free",
    href: "#",
    badge: "Popular",
    tags: ["Template", "Notion", "Productivity"],
    rating: 4.8,
  },
  {
    id: "3",
    name: "AI Prompt Vault",
    description:
      "500+ battle-tested prompts organized by use case for ChatGPT, Claude, and Gemini. Updated monthly.",
    price: 14 as number | "free",
    href: "#",
    tags: ["Prompts", "AI", "Resource"],
    rating: 4.7,
  },
] as const;

export const affiliateTools = [
  {
    id: "1",
    name: "Cursor IDE",
    description: "AI-first code editor that supercharges your development workflow with real-time pair programming.",
    category: "Development",
    recommendation: "The best AI coding tool I've used. Saves me hours every single day. Can't work without it.",
    href: "#",
    logo: "🖥️",
    discount: "Free tier",
  },
  {
    id: "2",
    name: "ConvertKit (Kit)",
    description: "Email marketing platform built specifically for creators. Simple, powerful, and highly scalable.",
    category: "Email Marketing",
    recommendation: "My go-to for newsletter growth and automation. Clean UI, powerful sequences, great deliverability.",
    href: "#",
    logo: "📧",
    discount: "Free for 1k subs",
  },
  {
    id: "3",
    name: "Vercel",
    description: "The premier platform for deploying Next.js and modern web apps with zero configuration friction.",
    category: "Hosting",
    recommendation: "Deploy in seconds. The developer experience is absolutely unmatched for modern web apps.",
    href: "#",
    logo: "▲",
  },
  {
    id: "4",
    name: "Supabase",
    description: "Open-source Firebase alternative with PostgreSQL, auth, storage, edge functions, and realtime.",
    category: "Backend",
    recommendation: "My backend of choice for every project. Generous free tier and incredible developer experience.",
    href: "#",
    logo: "⚡",
    discount: "Free tier",
  },
] as const;

export const featuredContent = [
  {
    id: "1",
    title: "How I Built 10 AI Tools in 6 Months",
    excerpt:
      "The frameworks, tools, and mindset shifts that helped me ship fast as a solo creator with zero funding.",
    category: "Case Study",
    date: "Jan 15, 2025",
    href: "#",
    readTime: "8 min",
  },
  {
    id: "2",
    title: "The Creator's Guide to AI Automation",
    excerpt:
      "Stop doing repetitive work. Here's how to automate 80% of your creator workflow using modern AI tools.",
    category: "Tutorial",
    date: "Jan 10, 2025",
    href: "#",
    readTime: "6 min",
  },
  {
    id: "3",
    title: "Why Every Creator Needs a Newsletter",
    excerpt:
      "Social media is rented land. Build your own distribution channel with email and own your audience forever.",
    category: "Article",
    date: "Jan 5, 2025",
    href: "#",
    readTime: "5 min",
  },
] as const;

export const faqItems = [
  {
    question: "What kind of tools does Sunstroke build?",
    answer:
      "I build AI-powered software tools focused on content creation, SEO, automation, and creator workflows. Every tool is designed to help indie builders and creators work smarter and ship faster.",
  },
  {
    question: "Are the recommended tools affiliate links?",
    answer:
      "Yes, some recommendations include affiliate links. However, I only recommend tools I personally use and trust. My reputation matters more than commissions — every recommendation is genuine.",
  },
  {
    question: "What will I get from the newsletter?",
    answer:
      "Weekly insights on AI tools, creator strategies, product building, and exclusive early access to new tools and products. No spam, no fluff — just actionable value, one email per week.",
  },
  {
    question: "Can I request a custom tool or feature?",
    answer:
      "Absolutely! I love building tools that solve real problems. Reach out through the contact page with your idea and I'll see how I can help.",
  },
  {
    question: "How often are new products released?",
    answer:
      "I aim to release a new tool or product every 4-6 weeks. Newsletter subscribers always get first access and exclusive launch discounts.",
  },
] as const;
