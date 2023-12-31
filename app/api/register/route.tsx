import { registerSchema, registrationSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  // console.log(body)
  const validation = registerSchema.safeParse(body);
  if(!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400});

  // const user = await prisma.user.findUnique({ where: { email: body.email }})
  // if (user) return NextResponse.json({ error: "User already exists"}, { status: 400});

  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name 
    }
  });

  return NextResponse.json({ email: newUser.email})
}
