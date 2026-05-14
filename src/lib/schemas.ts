import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters.")
});

export const profileSchema = z.object({
  full_name: z.string().min(2, "Add your name so family members know who invited them.")
});

export const archiveSchema = z.object({
  name: z.string().min(2, "Give your family archive a name.")
});

export const personSchema = z.object({
  full_name: z.string().min(1, "Add at least a name or remembered name."),
  birth_date: z.string().optional(),
  birth_place: z.string().optional(),
  notes: z.string().optional()
});

export const storySchema = z.object({
  title: z.string().min(2, "Add a story title."),
  excerpt: z.string().min(2, "Add a short description."),
  body: z.string().optional(),
  location: z.string().optional(),
  date_text: z.string().optional()
});
