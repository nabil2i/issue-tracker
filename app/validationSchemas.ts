import { z } from "zod";

export const statusSchema = z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]);

export const issueSchema =  z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required.').max(65535),
})

export const patchIssueSchema =  z.object({
  title: z.string().min(1, 'Title is required.').max(255).optional(),
  description: z.string().min(1, 'Description is required.').max(65535).optional(),
  assignedToUserId: z.string().min(1, 'AssignedToUserId is required.').max(255).optional().nullable(),
  status: statusSchema.optional(),
})

export const commentIssueSchema = z.object({
  text: z.string().min(1, 'Comment is required.').max(65535),
  // issueId: z.number().min(1, 'IssueId is required.').optional(),
  userId: z.string().min(1, 'UserId is required.').max(255)
});

export const registrationSchema = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
  email: z.string().email().min(8).max(255),
  password: z.string().min(5),
  password2: z.string().min(5).optional(),
});

export const updateUserSchema = z.object({
  // firstName: z.string().optional(),
  // lastName: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters.").max(20, "Name must be at most 20 characters.").optional(),
  email: z.string().email().min(8, "Email must be at least 8 characters.").max(255).optional(),
  password: z.string().min(5, "Password must be at least 5 characters.").optional(),
  password2: z.string().min(5, "Password must be at least 5 characters.").optional(),
});

export const emailSchema = z.object({
  email: z.string().email().min(8).max(255),
});


export const detailsSchema = z.object({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
});

export const passwordSchema = z.object({
  password: z.string().min(5),
  password2: z.string().min(5)
});

export const registerSchema = z.object({
  name: z.string().min(3).max(20).optional(),
  email: z.string().email().min(8).max(255),
  password: z.string().min(5),
});

export const loginSchema = z.object({
  email: z.string().email().min(8).max(255),
  password: z.string().min(5),
});

export const userSchema = z.object({
  email: z.string().email().min(8).max(255),
});
