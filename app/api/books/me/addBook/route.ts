import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Book from "@/models/Book";

export async function POST(request: Request) {
  try {
    const { title, author, ownerId } = await request.json();

    await connectToDB();
    const newBook = new Book({ title, author, ownerId });
    await newBook.save();
    return NextResponse.json(newBook);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add book with error: " + err },
      { status: 500 }
    );
  }
}
