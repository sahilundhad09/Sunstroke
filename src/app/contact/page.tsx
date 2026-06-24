"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FadeIn } from "@/components/motion/FadeIn";
import { CTAButton } from "@/components/shared/CTAButton";
import { CheckCircle, Mail, MessageSquare } from "lucide-react";
import type { ApiResponse } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactData) => {
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: ApiResponse = await res.json();
      if (result.success) { setSubmitted(true); reset(); }
      else { setError(result.error || "Something went wrong."); }
    } catch { setError("Connection failed. Please try again."); }
  };

  const inputCls = "h-11 w-full rounded-xl border border-sunstroke-border bg-sunstroke-surface/60 px-4 text-sm text-white placeholder:text-sunstroke-text-dim focus:border-sunstroke-cyan/40 focus:outline-none focus:ring-1 focus:ring-sunstroke-cyan/20 transition-colors";

  return (
    <div className="pt-24">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <span className="mb-4 inline-block rounded-full border border-sunstroke-border bg-sunstroke-surface/50 px-4 py-1.5 text-xs font-medium tracking-wider text-sunstroke-cyan uppercase">Get in Touch</span>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Let&apos;s <span className="gradient-text">Connect</span></h1>
            <p className="mx-auto mt-4 max-w-xl text-sunstroke-text-muted">Have a question, idea, or collaboration in mind? I&apos;d love to hear from you.</p>
          </FadeIn>

          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            <FadeIn direction="right" className="lg:col-span-2">
              <div className="space-y-4">
                <div className="glass-card flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sunstroke-cyan/10"><Mail className="h-5 w-5 text-sunstroke-cyan" /></div>
                  <div><h3 className="font-semibold text-white">Email</h3><p className="mt-1 text-sm text-sunstroke-text-muted">hello@sunstroke.dev</p></div>
                </div>
                <div className="glass-card flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sunstroke-cyan/10"><MessageSquare className="h-5 w-5 text-sunstroke-cyan" /></div>
                  <div><h3 className="font-semibold text-white">Social</h3><p className="mt-1 text-sm text-sunstroke-text-muted">DM me on LinkedIn or Twitter</p></div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1} className="lg:col-span-3">
              {submitted ? (
                <div className="glass-card flex flex-col items-center p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-400" />
                  <h3 className="mt-4 text-xl font-bold text-white">Message Sent!</h3>
                  <p className="mt-2 text-sunstroke-text-muted">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-4 p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-sunstroke-text">Name *</label>
                      <input {...register("name")} className={inputCls} placeholder="Your name" />
                      {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-sunstroke-text">Email *</label>
                      <input {...register("email")} type="email" className={inputCls} placeholder="your@email.com" />
                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-sunstroke-text">Subject</label>
                    <input {...register("subject")} className={inputCls} placeholder="What's this about?" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-sunstroke-text">Message *</label>
                    <textarea {...register("message")} rows={5} className={`${inputCls} py-3 resize-none`} style={{height: "auto"}} placeholder="Tell me more..." />
                    {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
                  </div>
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <CTAButton type="submit" loading={isSubmitting} disabled={isSubmitting} className="w-full">Send Message</CTAButton>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
