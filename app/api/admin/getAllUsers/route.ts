import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET() {
  try {
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch users", error: error.message },
      { status: 500 }
    );
  }
}
