"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFormInput } from "@/lib/validation";

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<{
    type: "idle" | "sending" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const [cooldown, setCooldown] = useState(0);

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const messageValue = form.watch("message") || "";

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function onSubmit(values: ContactFormInput) {
    if (cooldown > 0) return;

    setSubmissionState({ type: "sending", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json();

      if (res.ok) {
        setSubmissionState({
          type: "success",
          message: json.message || "Thanks! Your message has been sent successfully.",
        });
        form.reset();
        setCooldown(5); // 5-second anti-spam cooldown
      } else {
        setSubmissionState({
          type: "error",
          message: json.message || "Unable to send message. Please try again.",
        });
      }
    } catch {
      setSubmissionState({
        type: "error",
        message: "Network error occurred. Please check your connection.",
      });
    }
  }

  return (
    <div id="contact-form" className="relative p-6 sm:p-8 rounded-2xl border border-[#E6E6E6] bg-[#FFFFFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all">
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        {submissionState.type === "success" && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
            <span>{submissionState.message}</span>
          </div>
        )}

        {submissionState.type === "error" && (
          <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle size={18} className="shrink-0 text-rose-600" />
            <span>{submissionState.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-bold text-[#1A1A1A]">
              Name
            </label>
            <input
              id="name"
              {...form.register("name")}
              placeholder="Jayendra Patel"
              autoComplete="name"
              className="w-full h-11 rounded-xl border border-[#E6E6E6] bg-[#FFFFFF] px-4 text-xs text-[#1A1A1A] placeholder:text-[#AAAAAA] transition-all focus:ring-2 focus:ring-[#5B5CF6]/20 focus:border-[#5B5CF6] outline-none"
            />
            {form.formState.errors.name?.message && (
              <span className="text-xs font-medium text-rose-500">
                {form.formState.errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-bold text-[#1A1A1A]">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="name@example.com"
              autoComplete="email"
              className="w-full h-11 rounded-xl border border-[#E6E6E6] bg-[#FFFFFF] px-4 text-xs text-[#1A1A1A] placeholder:text-[#AAAAAA] transition-all focus:ring-2 focus:ring-[#5B5CF6]/20 focus:border-[#5B5CF6] outline-none"
            />
            {form.formState.errors.email?.message && (
              <span className="text-xs font-medium text-rose-500">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-xs font-bold text-[#1A1A1A]">
            Subject
          </label>
          <input
            id="subject"
            {...form.register("subject")}
            placeholder="Project inquiry / Opportunity"
            className="w-full h-11 rounded-xl border border-[#E6E6E6] bg-[#FFFFFF] px-4 text-xs text-[#1A1A1A] placeholder:text-[#AAAAAA] transition-all focus:ring-2 focus:ring-[#5B5CF6]/20 focus:border-[#5B5CF6] outline-none"
          />
          {form.formState.errors.subject?.message && (
            <span className="text-xs font-medium text-rose-500">
              {form.formState.errors.subject.message}
            </span>
          )}
        </div>

        {/* Message Textarea */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="message" className="text-xs font-bold text-[#1A1A1A]">
              Message
            </label>
            <span className={`text-[11px] font-mono ${messageValue.length > 900 ? "text-rose-500" : "text-[#888888]"}`}>
              {messageValue.length} / 1000
            </span>
          </div>
          <textarea
            id="message"
            rows={5}
            maxLength={1000}
            {...form.register("message")}
            placeholder="Hi Jayendra, I'd like to talk about..."
            className="w-full rounded-xl border border-[#E6E6E6] bg-[#FFFFFF] p-4 text-xs text-[#1A1A1A] placeholder:text-[#AAAAAA] transition-all focus:ring-2 focus:ring-[#5B5CF6]/20 focus:border-[#5B5CF6] outline-none resize-none"
          />
          {form.formState.errors.message?.message && (
            <span className="text-xs font-medium text-rose-500">
              {form.formState.errors.message.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submissionState.type === "sending" || cooldown > 0}
          className="group relative h-11 px-7 rounded-xl bg-[#1A1A1A] text-white font-semibold text-xs sm:text-sm hover:bg-[#2A2A2A] active:scale-[0.99] disabled:opacity-65 disabled:pointer-events-none shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5 self-start min-w-[160px]"
        >
          {submissionState.type === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin text-white" />
              <span>Sending Message...</span>
            </>
          ) : submissionState.type === "success" ? (
            <>
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Message Sent!</span>
            </>
          ) : cooldown > 0 ? (
            <span>Please wait {cooldown}s</span>
          ) : (
            <>
              <span>Send Message</span>
              <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
