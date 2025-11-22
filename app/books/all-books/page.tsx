"use client";
import { useQuery } from "@tanstack/react-query";
import { ui } from "@/components/ui/index";
import { useDebounce } from "use-debounce";
import axios from "axios";
import type { BookCreate } from "@/types/books.type";
import Link from "next/link";
import { useState } from "react";

export default function AllBooksPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const { data, error, isLoading } = useQuery<BookCreate[], Error>({
    queryKey: ["allBooks", debouncedSearchTerm, page],
    queryFn: async () => {
      const res = await axios.post("/api/all-books/filterByNameAuthor", {
        searchTerm: debouncedSearchTerm,
        page: page,
        limit: 2,
      });
      return res.data.books;
    },
  });

  const sortedBooks = data?.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="main">
      <h1 className="text-[3rem] font-extrabold dark:text-white">All Books</h1>
      <ui.Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search books..."
        className="my-4 w-full max-w-md"
      />
      {isLoading && <ui.Spinner />}
      {error && <div>Error loading books.</div>}
      {sortedBooks?.length === 0 && <div>No books found.</div>}
      <ul className="flex flex-row flex-wrap justify-center gap-6 w-full">
        {sortedBooks?.map((book: BookCreate) => (
          <li
            className="bg-[#202020] border-1-white rounded-2xl p-5 flex flex-col gap-2"
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
      <div className="flex justify-center mt-4 gap-4">
        <ui.Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </ui.Button>
        <span className="flex items-center text-white">Page {page}</span>
        <ui.Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data && data.length < 2}
        >
          Next
        </ui.Button>
      </div>
    </div>
  );
}
