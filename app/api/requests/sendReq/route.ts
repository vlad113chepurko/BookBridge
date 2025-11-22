"use server";
import { connectToDB } from "@/lib/db";
import Request from "@/models/Request";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const { bookId, bookTitle, bookAuthor, requesterId } = await request.json();

    if (!bookId || !bookTitle || !bookAuthor || !requesterId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const data = await User.findById(requesterId).select("name email");
    if (!data) {
      return NextResponse.json(
        { error: "Requester not found" },
        { status: 404 }
      );
    }

    const { name: requesterName, email: requesterEmail } = data;

    const newRequest = new Request({
      requesterId,
      bookTitle,
      bookAuthor,
      requesterName,
      requesterEmail,
    });

    await newRequest.save();

    return NextResponse.json(
      { message: "Request sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in /api/requests/sendReq:", error);
    return NextResponse.json(
      { error: "Failed to send request" },
      { status: 500 }
    );
  }
}
