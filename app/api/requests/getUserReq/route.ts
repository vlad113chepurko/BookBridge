"use server";
import { connectToDB } from "@/lib/db";
import Request from "@/models/Request";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const userRequests = await Request.find().populate(
      "requesterId",
      "name email"
    );

    return NextResponse.json(userRequests, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch user requests" },
      { status: 500 }
    );
  }
}
