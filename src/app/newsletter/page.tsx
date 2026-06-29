import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { FAQSection } from "@/components/shared/FAQSection";
import { faqItems } from "@/lib/constants";
import { getDbPosts } from "@/lib/db";
import { Mail, Zap, BookOpen, Gift, Calendar, Clock, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Join the Sunstroke newsletter for weekly insights on AI tools, creator strategies, and exclusive early access to new products.",
};

const benefits = [
  {
    icon: Zap,
    title: "Weekly AI Insights",
    description: "Curated updates on the best AI tools and how to use them effectively.",
    bg: "bg-[#00d4ff]",
  },
  {
    icon: BookOpen,
    title: "Creator Strategies",
    description: "Actionable tips for building, growing, and monetizing as an indie creator.",
    bg: "bg-[#ff90e8]",
  },
  {
    icon: Gift,
    title: "Exclusive Access",
    description: "Early access to new tools, beta invites, and subscriber-only discounts.",
    bg: "bg-[#ffc700]",
  },
];

// Rich fallback post to display when there are no database entries yet
const fallbackLatestPost = {
  title: "The Solo Creator's Playbook: Shipping AI Products In Weeks, Not Months",
  category: "Case Study",
  date: "Jun 28, 2026",
  readTime: "8 min",
  excerpt: "How one person with modern tools can build extraordinary software, automate 80% of operations, and scale distribution without a team.",
  image: "/images/newsletter_hero_cover.png",
  content: `
    <h3>The Shift in Indie Hacking</h3>
    <p>We are living in the most leverage-dense era in human history. Just five years ago, launching a SaaS or a digital store required a small team, months of dev work, and thousands of dollars in server architecture. Today, one developer with the right AI stack can launch a polished, secure, and highly scalable web application in a weekend.</p>
    <p>This isn't just about writing code faster; it's about the democratization of distribution. When you can build tools that solve hyper-specific problems, you no longer need huge marketing budgets. The tool becomes the marketing.</p>

    <blockquote>
      "The best leverage you have as a solo builder is velocity. If you can test five product hypotheses in the time it takes a traditional company to write a spec document, you win."
    </blockquote>

    <h3>My Go-To Tech Stack for 2026</h3>
    <p>To move fast, you need tools that get out of your way. Here is the exact stack I use to build every tool and digital resource for Sunstroke:</p>
    <ul>
      <li><strong>Frontend:</strong> Next.js (App Router) with Tailwind CSS for rapid styling.</li>
      <li><strong>Database & Auth:</strong> Supabase for serverless Postgres and instant storage buckets.</li>
      <li><strong>AI Pair Programming:</strong> Cursor + Claude 3.5 Sonnet for writing clean logic.</li>
      <li><strong>Deployment:</strong> Vercel for zero-config global hosting.</li>
    </ul>

    <pre><code>// Instant data fetching with Supabase
export async function getLatestProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  return data;
}</code></pre>

    <h3>Designing a Neo-Brutalist UX</h3>
    <p>Why do Sunstroke tools look different? Because the internet is saturated with generic, clean, "minimalist" SaaS templates that all blend together. Neo-brutalism—with its thick black borders, high-contrast flat shapes, and bold offset shadows—creates immediate visual interest. It says: <em>this product has a personality</em>.</p>
    <p>It's also extremely easy to style, highly accessible, and looks fantastic on mobile devices. When design is distinct, users remember your brand.</p>

    <h3>Automating the Boring Stuff</h3>
    <p>You can't be a solo creator if you're spending 4 hours a day on admin work. Use serverless cron jobs or triggers to handle automated email notifications, database cleanups, and social media posting. Focus your human hours strictly on building features and writing content that matters.</p>
  `,
};

export default async function NewsletterPage() {
  const posts = await getDbPosts();

  // Find latest post with content, or fall back to mock
  const latestPost = posts.find((p) => p.content) || fallbackLatestPost;
  
  // Related posts (excluding the featured one)
  const relatedPosts = posts.filter((p) => p.id !== latestPost.id).slice(0, 3);

  return (
    <div className="pt-24 bg-[#f4f1ea]">
      
      {/* Editorial Header */}
      <section className="py-12 border-b-3 border-black bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="mb-3 inline-block rounded-lg border-2 border-black bg-[#ff90e8] px-4 py-1 font-heading text-xs font-black tracking-widest text-black uppercase shadow-gumroad-sm">
            The Sunstroke Dispatch
          </span>
          <h1 className="font-heading text-4xl font-black text-black sm:text-5xl lg:text-6xl">
            Weekly Insights for Creators
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-bold text-zinc-700">
            Join 1,200+ indie builders receiving real, no-fluff case studies on AI tools, development stack guides, and modern design.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Full Featured Latest Newsletter */}
            <div className="lg:col-span-8 space-y-8">
              <FadeIn>
                <article className="rounded-3xl border-4 border-black bg-white shadow-gumroad overflow-hidden">
                  
                  {/* Article Header info */}
                  <div className="p-6 sm:p-8 bg-[#ffc700] border-b-4 border-black">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-black text-black mb-4">
                      <span className="rounded-lg border-2 border-black bg-white px-2 py-0.5 uppercase shadow-gumroad-sm">
                        Latest Issue
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 stroke-[2.5]" /> {latestPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 stroke-[2.5]" /> {latestPost.readTime || "5 min read"}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4 stroke-[2.5]" /> Sunstroke
                      </span>
                    </div>

                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-black leading-tight">
                      {latestPost.title}
                    </h2>
                  </div>

                  {/* Article Cover Image */}
                  {latestPost.image && (
                    <div className="relative h-64 sm:h-96 w-full border-b-4 border-black">
                      <Image
                        src={latestPost.image}
                        alt={latestPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        priority
                      />
                    </div>
                  )}

                  {/* Editorial Article Body */}
                  <div 
                    className="p-6 sm:p-10 prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-black prose-headings:text-black prose-p:font-bold prose-p:text-zinc-800 prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-[#f4f1ea] prose-blockquote:p-4 prose-blockquote:rounded-xl prose-blockquote:font-heading prose-blockquote:italic prose-li:font-bold prose-li:text-zinc-800 prose-code:font-mono prose-code:font-black prose-code:bg-zinc-100 prose-code:p-1 prose-code:rounded prose-pre:bg-zinc-950 prose-pre:border-3 prose-pre:border-black prose-pre:shadow-gumroad-sm prose-pre:p-4 prose-pre:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: latestPost.content || "" }}
                  />

                  {/* Article Footer subscribe nudge */}
                  <div className="p-6 sm:p-8 bg-[#ff90e8] border-t-4 border-black text-center">
                    <h4 className="font-heading text-xl font-black text-black">Loved this dispatch?</h4>
                    <p className="mt-1 text-sm font-bold text-zinc-900">Get the next one directly in your inbox. Every Sunday.</p>
                    <div className="mx-auto mt-4 max-w-md">
                      <NewsletterForm source="newsletter-bottom-dispatch" variant="inline" buttonText="Subscribe Free" />
                    </div>
                  </div>

                </article>
              </FadeIn>
            </div>

            {/* Right Column: Sticky Sidebar with Profile and Subscribe */}
            <div className="lg:col-span-4 space-y-6 lg:h-fit lg:sticky lg:top-24">
              
              {/* Profile Card */}
              <FadeIn delay={0.1}>
                <div className="gumroad-card bg-white p-6 border-3 border-black shadow-gumroad">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-black shadow-gumroad-sm bg-[#ff90e8]">
                      <span className="absolute inset-0 flex items-center justify-center font-heading text-2xl font-black text-black">
                        SS
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-black text-black">Sunstroke</h3>
                      <p className="text-xs font-mono font-black uppercase text-zinc-500">Developer & Creator</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs font-bold text-zinc-800 leading-relaxed">
                    I build AI-powered tools, ship digital products, and write about the intersection of design, code, and creators. Follow my weekly journey.
                  </p>
                </div>
              </FadeIn>

              {/* Sticky Subscribe Form Card */}
              <FadeIn delay={0.2}>
                <div className="gumroad-card bg-[#00d4ff] p-6 border-3 border-black shadow-gumroad">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white shadow-gumroad-sm">
                    <Mail className="h-5 w-5 text-black stroke-[2.5]" />
                  </div>
                  <h3 className="font-heading text-xl font-black text-black">Subscribe to Dispatch</h3>
                  <p className="mt-2 text-xs font-bold text-zinc-950 leading-relaxed">
                    Join 1,200+ builders. Zero spam, one concise email every Sunday containing actionable builder plays.
                  </p>
                  
                  <div className="mt-5">
                    <NewsletterForm source="newsletter-sidebar" variant="stacked" buttonText="Subscribe Free" />
                  </div>
                </div>
              </FadeIn>

              {/* Benefits checklist Card */}
              <FadeIn delay={0.3}>
                <div className="gumroad-card bg-white p-6 border-3 border-black shadow-gumroad">
                  <h3 className="font-heading text-base font-black text-black mb-4">What you get:</h3>
                  <div className="space-y-4">
                    {benefits.map((b) => (
                      <div key={b.title} className="flex gap-3 items-start">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-black ${b.bg} shadow-gumroad-sm`}>
                          <b.icon className="h-4 w-4 text-black stroke-[2.5]" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-black">{b.title}</h4>
                          <p className="text-[10px] font-bold text-zinc-700 mt-0.5">{b.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

            </div>

          </div>
        </div>
      </section>

      {/* Past Dispatches Section */}
      {relatedPosts.length > 0 && (
        <>
          <div className="section-divider" />
          <section className="py-16 sm:py-24 bg-[#f4f1ea]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <span className="mb-2 inline-block rounded-lg border-2 border-black bg-[#ffc700] px-3 py-1 font-heading text-xs font-black uppercase text-black shadow-gumroad-sm">
                  Archive
                </span>
                <h2 className="font-heading text-3xl font-black text-black">
                  Past Dispatches
                </h2>
              </div>

              <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post) => (
                  <StaggerItem key={post.id}>
                    <Link
                      href={post.href}
                      className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border-3 border-black bg-white shadow-gumroad transition-all duration-200 hover:shadow-gumroad-lg"
                    >
                      <div>
                        {/* cover image */}
                        <div className="relative h-48 w-full border-b-3 border-black bg-[#ff90e8]">
                          {post.image ? (
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#ff90e8] to-[#00d4ff] p-4 text-center">
                              <span className="font-heading text-xl font-black text-black opacity-30 select-none">
                                {post.title}
                              </span>
                            </div>
                          )}
                          <span className="absolute left-4 top-4 rounded-lg border-2 border-black bg-[#ffc700] px-2 py-0.5 text-[9px] font-mono font-black uppercase text-black shadow-gumroad-sm">
                            {post.category}
                          </span>
                        </div>

                        {/* content excerpt */}
                        <div className="p-5">
                          <div className="flex items-center gap-3 text-[10px] font-mono font-black text-zinc-500 mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {post.readTime}
                            </span>
                          </div>

                          <h3 className="font-heading text-lg font-black text-black group-hover:underline leading-tight">
                            {post.title}
                          </h3>

                          <p className="mt-2 text-xs font-bold leading-relaxed text-zinc-700 line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <span className="btn-gumroad w-full py-2 text-[10px] font-black uppercase tracking-wider bg-[#f4f1ea] border-2 group-hover:bg-[#ff90e8] transition-colors">
                          Read Issue <ArrowRight className="ml-1.5 h-3.5 w-3.5 stroke-[3]" />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        </>
      )}

      <div className="section-divider" />

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeIn className="mb-10 text-center">
            <h2 className="font-heading text-2xl font-black text-black sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <FAQSection items={faqItems} />
        </div>
      </section>
    </div>
  );
}
