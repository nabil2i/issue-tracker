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
  issueId: z.number().min(1, 'IssueId is required.'),
  userId: z.string().min(1, 'UserId is required.').max(255)
  // email: z.string().min(1, 'UserId is required.').max(255)
});
