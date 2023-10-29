
import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "User not authorized"}, { status: 401 });
  
  const user = await prisma.user.findUnique({
    where: { email: params.email },
  });
  if (!user)
    return NextResponse.json({ error: "Invalid user" }, { status: 404 });

  await prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json({}, { status: 403 });
}
