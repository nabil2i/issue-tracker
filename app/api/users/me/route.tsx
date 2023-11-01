import authOptions from "@/app/auth/authOptions";
import { updateUserSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "User not authorized" }, { status: 401 });

  // const body = await request.json();
  // const validation = userSchema.safeParse(body);

  // if (!validation.success)
  //   return NextResponse.json(validation.error.format(), { status: 400 })

  // const { email} = body;
  const email = session.user?.email;

  try {
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        // console.log(user);
        return NextResponse.json(user, { status: 200 });
      } else {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json(
        { error: "Error retrieving the user" },
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

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "User not authorized" }, { status: 401 });

  // const body = await request.json();
  // const validation = userSchema.safeParse(body);

  // if (!validation.success)
  //   return NextResponse.json(validation.error.format(), { status: 400 })

  // const { email} = body;
  const email = session.user?.email;

  // console.log(email)
  try {
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user)
        return NextResponse.json({ error: "Invalid user" }, { status: 404 });
      else {
        await prisma.user.delete({
          where: { id: user.id },
        });

        return NextResponse.json({});
      }
    } else {
      return NextResponse.json(
        { error: "Error retrieving the user" },
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

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "User not authorized" }, { status: 401 });

  const body = await request.json();
  // console.log(body)
  const validation = updateUserSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const userEmail = session.user?.email;
  // console.log(userEmail)
  const { name, password, email } = body;

  try {
    if (userEmail) {
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
      });
      if (!user) {
        return NextResponse.json({ error: "Invalid user" }, { status: 404 });
      } else {
        // console.log(user)
        let hashedPassword = user.hashedPassword;
        if (password ) {
          hashedPassword = await bcrypt.hash(password, 5);
        }
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            name,
            email,
            hashedPassword,
          },
        });
        return NextResponse.json({email: updatedUser.email});
      }
    } else {
      return NextResponse.json(
        { error: "Error retrieving the user" },
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
