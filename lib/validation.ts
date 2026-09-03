import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  subject: z.string().min(3, "Please add a subject."),
  message: z.string().min(10, "Please write a little more."),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
