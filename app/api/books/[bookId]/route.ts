"use server";
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Book from "@/models/Book";

export async function GET(
  req: Request,
  context: { params: { bookId: string } }
) {
  try {
    const params = await context.params;
    const { bookId } = params;
    await connectToDB();
    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch book with error: " + String(err) },
      { status: 500 }
    );
  }
}
