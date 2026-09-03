"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFormInput } from "@/lib/validation";
import { EmailService } from "@/services/email.service";
import { Button } from "@/components/ui/primitives";

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormInput) {
    setSubmissionState({ type: "idle", message: "" });
    const result = await new EmailService().send(values);

    if (result.ok) {
      setSubmissionState({ type: "success", message: result.message });
      form.reset();
    } else {
      setSubmissionState({ type: "error", message: result.message });
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {submissionState.type === "success" && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-300 text-sm font-semibold">
          <CheckCircle2 size={20} className="shrink-0" />
          <span>{submissionState.message}</span>
        </div>
      )}

      {submissionState.type === "error" && (
        <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-700 dark:text-rose-300 text-sm font-semibold">
          <AlertCircle size={20} className="shrink-0" />
          <span>{submissionState.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-foreground">
            Name
          </label>
          <input
            id="name"
            {...form.register("name")}
            placeholder="Your Name"
            autoComplete="name"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          {form.formState.errors.name?.message && (
            <span className="text-xs font-medium text-rose-500">
              {form.formState.errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...form.register("email")}
            placeholder="your.email@example.com"
            autoComplete="email"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          {form.formState.errors.email?.message && (
            <span className="text-xs font-medium text-rose-500">
              {form.formState.errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-semibold text-foreground">
          Subject
        </label>
        <input
          id="subject"
          {...form.register("subject")}
          placeholder="Project Inquiry / Opportunity"
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        {form.formState.errors.subject?.message && (
          <span className="text-xs font-medium text-rose-500">
            {form.formState.errors.subject.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-semibold text-foreground">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...form.register("message")}
          placeholder="Tell me about your project or inquiry..."
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-y"
        />
        {form.formState.errors.message?.message && (
          <span className="text-xs font-medium text-rose-500">
            {form.formState.errors.message.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={form.formState.isSubmitting}
        className="mt-2 w-full sm:w-auto self-start"
      >
        {form.formState.isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>Send Message</span>
          </>
        )}
      </Button>
    </form>
  );
}
