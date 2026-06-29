-- Sunstroke Database Seeding Script
-- Run this in your Supabase SQL Editor to configure tables and load initial data.

-- 1. Create the tools table if it doesn't exist
CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  status TEXT DEFAULT 'live' CHECK (status IN ('live', 'beta', 'coming-soon')),
  tags TEXT[],
  href TEXT,
  icon TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for tools
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read tools" ON tools;
CREATE POLICY "Public read tools" ON tools FOR SELECT USING (true);

-- 2. Modify existing tables to support expanded features
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS badge TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating NUMERIC(3,2);

ALTER TABLE affiliate_links ADD COLUMN IF NOT EXISTS discount TEXT;

-- 3. Clear existing seed data to avoid duplicates (optional, use with caution in production)
TRUNCATE TABLE tools CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE affiliate_links CASCADE;
TRUNCATE TABLE posts CASCADE;

-- 4. Seed Tools
INSERT INTO tools (name, tagline, description, status, tags, href, icon, featured)
VALUES 
  (
    'AI Content Engine', 
    'Write · Optimize · Distribute', 
    'Generate, optimize, and distribute content across platforms with AI-powered automation. 10x your output without sacrificing quality.', 
    'live', 
    ARRAY['Content', 'AI', 'Automation'], 
    '#', 
    '⚡', 
    true
  ),
  (
    'Smart SEO Analyzer', 
    'Rank Higher, Faster', 
    'Deep-dive SEO audits powered by AI with actionable improvement recommendations and competitor analysis.', 
    'beta', 
    ARRAY['SEO', 'Analytics', 'AI'], 
    '#', 
    '🔍', 
    true
  ),
  (
    'Creator CRM', 
    'Manage Your Network', 
    'Manage collaborations, track leads, and grow your creator network intelligently with AI-assisted insights.', 
    'coming-soon', 
    ARRAY['CRM', 'Business', 'Network'], 
    '#', 
    '🤝', 
    true
  );

-- 5. Seed Products
INSERT INTO products (title, description, price, currency, purchase_url, category, featured, status, badge, tags, rating)
VALUES
  (
    'The Creator''s AI Playbook',
    'A comprehensive guide to leveraging AI tools for content creation, automation, and growth. 80+ pages of actionable strategies.',
    29.00,
    'USD',
    '#',
    'Guide',
    true,
    'active',
    'Bestseller',
    ARRAY['Guide', 'AI', 'Strategy'],
    4.9
  ),
  (
    'Notion Creator Dashboard',
    'All-in-one Notion workspace for managing content, projects, and revenue. Plug-and-play for any creator workflow.',
    19.00,
    'USD',
    '#',
    'Template',
    true,
    'active',
    'Popular',
    ARRAY['Template', 'Notion', 'Productivity'],
    4.8
  ),
  (
    'AI Prompt Vault',
    '500+ battle-tested prompts organized by use case for ChatGPT, Claude, and Gemini. Updated monthly.',
    14.00,
    'USD',
    '#',
    'Resource',
    true,
    'active',
    NULL,
    ARRAY['Prompts', 'AI', 'Resource'],
    4.7
  );

-- 6. Seed Affiliate Links
INSERT INTO affiliate_links (name, description, url, category, logo_url, recommendation, discount, featured)
VALUES
  (
    'Cursor IDE',
    'AI-first code editor that supercharges your development workflow with real-time pair programming.',
    '#',
    'Development',
    '🖥️',
    'The best AI coding tool I''ve used. Saves me hours every single day. Can''t work without it.',
    'Free tier',
    true
  ),
  (
    'ConvertKit (Kit)',
    'Email marketing platform built specifically for creators. Simple, powerful, and highly scalable.',
    '#',
    'Email Marketing',
    '📧',
    'My go-to for newsletter growth and automation. Clean UI, powerful sequences, great deliverability.',
    'Free for 1k subs',
    true
  ),
  (
    'Vercel',
    'The premier platform for deploying Next.js and modern web apps with zero configuration friction.',
    '#',
    'Hosting',
    '▲',
    'Deploy in seconds. The developer experience is absolutely unmatched for modern web apps.',
    NULL,
    true
  ),
  (
    'Supabase',
    'Open-source Firebase alternative with PostgreSQL, auth, storage, edge functions, and realtime.',
    '#',
    'Backend',
    '⚡',
    'My backend of choice for every project. Generous free tier and incredible developer experience.',
    'Free tier',
    true
  );

-- 7. Seed Posts (Content)
INSERT INTO posts (title, slug, excerpt, content, image_url, category, published, published_at)
VALUES
  (
    'How I Built 10 AI Tools in 6 Months',
    'built-10-ai-tools',
    'The frameworks, tools, and mindset shifts that helped me ship fast as a solo creator with zero funding.',
    'Full case study content goes here. Step 1 was setting up a database pipeline. Step 2 was creating reusable UI layouts.',
    NULL,
    'Case Study',
    true,
    now() - INTERVAL '10 days'
  ),
  (
    'The Creator''s Guide to AI Automation',
    'creators-guide-ai-automation',
    'Stop doing repetitive work. Here''s how to automate 80% of your creator workflow using modern AI tools.',
    'Learn how to leverage standard scripts and hooks to trigger automatic SEO analytics reports and newsletter distribution.',
    NULL,
    'Tutorial',
    true,
    now() - INTERVAL '15 days'
  ),
  (
    'Why Every Creator Needs a Newsletter',
    'why-every-creator-needs-newsletter',
    'Social media is rented land. Build your own distribution channel with email and own your audience forever.',
    'Own your audience by storing subscribers in a dedicated database and utilizing reliable delivery streams like ConvertKit.',
    NULL,
    'Article',
    true,
    now() - INTERVAL '20 days'
  );
