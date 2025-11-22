'use server';
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Book from "@/models/Book";

export async function GET() {
  try {
    await connectToDB();
    const books = await Book.find({});
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
