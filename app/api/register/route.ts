import prisma from "@/app/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;
  const hashpassword = await bcrypt.hash(password, 12);
  // const isSameUser = await prisma.user.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });
  // if (isSameUser) {
  //   return NextResponse.json("User Already Exist");
  // }
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashpassword,
    },
  });

  return NextResponse.json(user);
}
