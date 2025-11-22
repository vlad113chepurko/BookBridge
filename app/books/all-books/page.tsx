"use client";
import { useQuery } from "@tanstack/react-query";
import { ui } from "@/components/ui/index";
import type { BookCreate } from "@/types/books.type";
import Link from "next/link";

export default function AllBooksPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const response = await fetch("/api/all-books/getAll");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) return <ui.Spinner />;
  if (error) return <div>Error loading books.</div>;
  if (!data) return <div>No books found.</div>;

  return (
    <div className="main">
      <h1 className="text-[3rem] font-extrabold  dark:text-white ">
        All Books
      </h1>
      <ul className="flex flex-row flex-wrap justify-center gap-6 w-full">
        {data.map((book: BookCreate) => (
          <li
            className="bg-[#202020] border-1-white rounded-2xl p-5 flex flex-col gap-2 "
            key={book._id}
          >
            <strong>{book.title}</strong> by {book.author}
            <Link
              className="text-xl text-blue-600 hover:underline"
              href={`/books/${book._id}`}
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
