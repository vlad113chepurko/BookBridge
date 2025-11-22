"use server";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Book from "@/models/Book";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ownerId = searchParams.get("ownerId");
    if (!ownerId) {
      return NextResponse.json(
        { error: "Owner ID is required" },
        { status: 400 }
      );
    }
    await connectToDB();
    const books = await Book.find({ ownerId });
    return NextResponse.json(books);
  } catch (err) {
    console.error("Failed to get books:", err);
    return NextResponse.json(
      { error: "Failed to get books with error: " + err },
      { status: 500 }
    );
  }
}
