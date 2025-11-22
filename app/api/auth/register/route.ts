"use server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    await connectToDB();

    const exits = await User.findOne({ email });

    if (exits) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      email,
      name,
      password: hashedPassword,
    };

    await User.create(newUser);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
    
  } catch (err) {
    console.error("Error during user registration:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
