import authOptions from "@/app/auth/authOptions";
import { commentIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const comments = await prisma.comment.findMany({ where: { issueId: parseInt(params.id)}});
  return NextResponse.json(comments);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "User not authorized" }, { status: 401 });

  const body = await request.json();
  const validation = commentIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { text, userId } = body;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const newComment = await prisma.comment.create({
    data: { text, userId, issueId: parseInt(params.id) },
  });

  return NextResponse.json(newComment, { status: 201 });
}
