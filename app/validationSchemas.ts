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
  firstName: z.string(),
  lastName: z.string(),
  name: z.string(),
  email: z.string().email().min(8).max(255),
  password: z.string().min(5),
  password2: z.string().min(5).optional(),
});

export const emailSchema = z.object({
  email: z.string().email().min(8).max(255),
});


export const detailsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export const passwordSchema = z.object({
  password: z.string().min(5),
  password2: z.string().min(5)
});

export const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().min(8).max(255),
  password: z.string().min(5),
});

export const loginSchema = z.object({
  email: z.string().email().min(8).max(255),
  password: z.string().min(5),
});
