import { connectToDB } from "@/lib/db";
import Book from "@/models/Book";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const { searchTerm } = await request.json();
    const regex = new RegExp(searchTerm, "i");
    const filteredBooks = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    });
    return NextResponse.json(filteredBooks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to filter books" }, { status: 500 });
  }
}