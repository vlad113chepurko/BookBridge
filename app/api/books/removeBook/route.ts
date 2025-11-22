"use server";
import { connectToDB } from "@/lib/db";
import { NextResponse } from "next/server";
import Book from "@/models/Book";

export async function DELETE(request: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(deletedBook);
  } catch (err) {
    console.error("Failed to delete book:", err);
    return NextResponse.json(
      { error: "Failed to delete book with error: " + err },
      { status: 500 }
    );
  }
}
