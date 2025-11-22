import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Book from "@/models/Book";

export async function POST(request: Request) {
  try {
    await connectToDB();
    const { searchTerm, page = 1, limit = 10 } = await request.json();

    const regex = new RegExp(searchTerm, "i");

    const skip = (page - 1) * limit;

    const filteredBooks = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    })
      .sort({ title: 1 }) 
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments({
      $or: [{ title: regex }, { author: regex }],
    });

    return NextResponse.json(
      {
        books: filteredBooks,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
