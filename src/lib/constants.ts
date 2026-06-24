export const siteConfig = {
  name: "Sunstroke",
  description:
    "Sunstroke builds AI-powered tools, digital products, and curates the best software for creators and indie builders.",
  url: "https://sunstroke.dev",
  ogImage: "https://sunstroke.dev/og.png",
  creator: "Sunstroke",
  links: {
    linkedin: "https://www.linkedin.com/in/sunstroke-ai-30203b416/",
    twitter: "https://twitter.com/sunstroke_ai",
    github: "https://github.com/sunstroke-ai",
    youtube: "https://youtube.com/@sunstroke",
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
    title: "AI Content Engine",
    description: "Generate, optimize, and distribute content across platforms with AI-powered automation.",
    status: "live" as const,
    category: "Content",
    href: "#",
  },
  {
    id: "2",
    title: "Smart SEO Analyzer",
    description: "Deep-dive SEO audits powered by AI with actionable improvement recommendations.",
    status: "beta" as const,
    category: "SEO",
    href: "#",
  },
  {
    id: "3",
    title: "Creator CRM",
    description: "Manage collaborations, track leads, and grow your creator network intelligently.",
    status: "coming-soon" as const,
    category: "Business",
    href: "#",
  },
] as const;

export const featuredProducts = [
  {
    id: "1",
    title: "The Creator's AI Playbook",
    description: "A comprehensive guide to leveraging AI tools for content creation, automation, and growth.",
    price: "$29",
    category: "Guide",
    href: "#",
  },
  {
    id: "2",
    title: "Notion Creator Dashboard",
    description: "All-in-one Notion workspace for managing content, projects, and revenue as a creator.",
    price: "$19",
    category: "Template",
    href: "#",
  },
  {
    id: "3",
    title: "AI Prompt Vault",
    description: "500+ battle-tested prompts organized by use case for ChatGPT, Claude, and more.",
    price: "$14",
    category: "Resource",
    href: "#",
  },
] as const;

export const affiliateTools = [
  {
    id: "1",
    name: "Cursor IDE",
    description: "AI-first code editor that supercharges your development workflow.",
    category: "Development",
    recommendation: "The best AI coding tool I've used. Saves me hours every day.",
    href: "#",
  },
  {
    id: "2",
    name: "ConvertKit",
    description: "Email marketing platform built for creators. Simple, powerful, and scalable.",
    category: "Email Marketing",
    recommendation: "My go-to for newsletter growth and automation. Clean UI, powerful automations.",
    href: "#",
  },
  {
    id: "3",
    name: "Vercel",
    description: "The best platform for deploying Next.js apps with zero configuration.",
    category: "Hosting",
    recommendation: "Deploy in seconds. The DX is unmatched for modern web apps.",
    href: "#",
  },
  {
    id: "4",
    name: "Supabase",
    description: "Open-source Firebase alternative with PostgreSQL, auth, storage, and realtime.",
    category: "Backend",
    recommendation: "My backend of choice. Generous free tier and amazing developer experience.",
    href: "#",
  },
] as const;

export const featuredContent = [
  {
    id: "1",
    title: "How I Built 10 AI Tools in 6 Months",
    excerpt: "The frameworks, tools, and mindset shifts that helped me ship fast as a solo creator.",
    category: "Case Study",
    date: "2025-01-15",
    href: "#",
  },
  {
    id: "2",
    title: "The Creator's Guide to AI Automation",
    excerpt: "Stop doing repetitive work. Here's how to automate 80% of your creator workflow with AI.",
    category: "Tutorial",
    date: "2025-01-10",
    href: "#",
  },
  {
    id: "3",
    title: "Why Every Creator Needs a Newsletter",
    excerpt: "Social media is rented land. Build your own distribution channel with email.",
    category: "Article",
    date: "2025-01-05",
    href: "#",
  },
] as const;

export const faqItems = [
  {
    question: "What kind of tools does Sunstroke build?",
    answer: "I build AI-powered software tools focused on content creation, SEO, automation, and creator workflows. Every tool is designed to help indie builders and creators work smarter and ship faster.",
  },
  {
    question: "Are the recommended tools affiliate links?",
    answer: "Yes, some recommendations include affiliate links. However, I only recommend tools I personally use and trust. My reputation matters more than commissions — every recommendation is genuine.",
  },
  {
    question: "What will I get from the newsletter?",
    answer: "Weekly insights on AI tools, creator strategies, product building, and exclusive early access to new tools and products. No spam, no fluff — just actionable value.",
  },
  {
    question: "Can I request a custom tool or feature?",
    answer: "Absolutely! I love building tools that solve real problems. Reach out through the contact page with your idea and I'll see how I can help.",
  },
] as const;
