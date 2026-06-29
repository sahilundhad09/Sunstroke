"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FadeIn } from "@/components/motion/FadeIn";
import { CheckCircle, Mail, MessageSquare, Send } from "lucide-react";
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

  const inputCls = "h-11 w-full rounded-xl border-2 border-black bg-white px-4 text-sm font-bold text-black placeholder:text-zinc-500 shadow-gumroad-sm focus:outline-none focus:ring-2 focus:ring-black transition-all";

  return (
    <div className="pt-24 bg-[#f4f1ea]">
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn className="text-center">
            <span className="mb-4 inline-block rounded-lg border-2 border-black bg-[#00d4ff] px-4 py-1.5 font-heading text-xs font-black tracking-widest text-black uppercase shadow-gumroad-sm">
              Get in Touch
            </span>
            <h1 className="font-heading text-4xl font-black text-black sm:text-5xl">
              Let&apos;s{" "}
              <span className="inline-block rounded-xl border-3 border-black bg-[#ff90e8] px-3 py-1 shadow-gumroad-sm transform -rotate-1">
                Connect
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl font-bold text-zinc-800">
              Have a question, idea, or collaboration in mind? I&apos;d love to hear from you.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            <FadeIn direction="right" className="lg:col-span-2">
              <div className="space-y-4">
                <div className="gumroad-card flex items-start gap-4 bg-[#ffc700] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-white shadow-gumroad-sm">
                    <Mail className="h-5 w-5 text-black stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-black">Email</h3>
                    <p className="mt-1 text-sm font-bold text-zinc-900">hello@sunstroke.dev</p>
                  </div>
                </div>
                <div className="gumroad-card flex items-start gap-4 bg-[#ff90e8] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-white shadow-gumroad-sm">
                    <MessageSquare className="h-5 w-5 text-black stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-black">Social</h3>
                    <p className="mt-1 text-sm font-bold text-zinc-900">DM me on LinkedIn or Twitter</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1} className="lg:col-span-3">
              {submitted ? (
                <div className="gumroad-card flex flex-col items-center bg-[#00e599] p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-black stroke-[2]" />
                  <h3 className="mt-4 font-heading text-xl font-black text-black">Message Sent!</h3>
                  <p className="mt-2 font-bold text-zinc-900">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="gumroad-card space-y-4 p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-black text-black">Name *</label>
                      <input {...register("name")} className={inputCls} placeholder="Your name" />
                      {errors.name && <p className="mt-1 text-xs font-bold text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-black text-black">Email *</label>
                      <input {...register("email")} type="email" className={inputCls} placeholder="your@email.com" />
                      {errors.email && <p className="mt-1 text-xs font-bold text-red-600">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-black text-black">Subject</label>
                    <input {...register("subject")} className={inputCls} placeholder="What's this about?" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-black text-black">Message *</label>
                    <textarea {...register("message")} rows={5} className={`${inputCls} h-auto py-3 resize-none`} placeholder="Tell me more..." />
                    {errors.message && <p className="mt-1 text-xs font-bold text-red-600">{errors.message.message}</p>}
                  </div>
                  {error && <p className="text-sm font-bold text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gumroad w-full py-3 text-sm font-black uppercase tracking-wider gap-2"
                  >
                    <Send className="h-4 w-4 stroke-[2.5]" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
