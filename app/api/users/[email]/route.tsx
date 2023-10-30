import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session)
  //   return NextResponse.json({ error: "User not authorized"}, { status: 401 });
  // console.log(params);
  try {
    if (params?.email) {
      const user = await prisma.user.findUnique({
        where: { email: params.email },
      });
      if (user) {
        // console.log(user);
        return NextResponse.json({email: user.email }, { status: 200 });
      } else {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json(
        { error: "Email parameter is missing" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "User not authorized"}, { status: 401 });

  const email = params.email;
  // console.log(email)
  
  const user = await prisma.user.findUnique({
    where: { email },
  });
  // console.log(user)
  if (!user)
    return NextResponse.json({ error: "Invalid user" }, { status: 404 });

  await prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json({});
}
