import { NextRequest, NextResponse } from "next/server";
import {  commentIssueSchema } from "../../validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "User not authorized"}, { status: 401 });

  const body = await request.json();
  const validation = commentIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const { text, userId, issueId } = body;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const newComment = await prisma.comment.create({
    data: { text, userId, issueId }
  });

  return NextResponse.json(newComment, { status: 201 });
}
