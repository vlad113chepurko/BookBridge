"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { BookCreate } from "@/types/books.type";
import { useAddBookModalStore } from "@/store/useAddBookModalStore";
import { queryClient } from "@/lib/queryClient";
import axios from "axios";
import { ui } from "@/components/ui/index";
import { modals } from "@/components/modals/index";

export default function MeBookgs() {
  const { open } = useAddBookModalStore();

  const getData: () => Promise<BookCreate[]> = async () => {
    const ownerId = localStorage.getItem("userId");
    if (!ownerId) {
      throw new Error("User not logged in");
    }
    const res = await axios.get(`/api/books/getAll?ownerId=${ownerId}`);
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me-books"],
    queryFn: getData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  const removeBook = async (bookId: string) => {
    try {
      await axios.delete(`/api/books/removeBook?bookId=${bookId}`);
      queryClient.invalidateQueries({ queryKey: ["me-books"] });
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  return (
    <div className="main">
      <h1 className="text-[3rem] font-extrabold  dark:text-white ">My Books</h1>
      <modals.AddBookModal />
      {isError && <p className="text-red-500">Failed to load books.</p>}
      {isLoading ? (
        <ui.Spinner className="size-6" />
      ) : (
        <div className="flex flex-col flex-wrap gap-4 mt-6 justify-center ">
          {data && data.length > 0 ? (
            data.map((book: BookCreate) => (
              <div key={book._id} className="book-item">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Title: {book.title}
                </h2>
                <p>Author: {book.author}</p>
                <ui.Button
                  className="cursor-pointer"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeBook(book._id)}
                >
                  Remove
                </ui.Button>
                <ui.Button>
                  <Link className="w-full h-full" href={`/books/${book._id}`}>
                    View Details
                  </Link>
                </ui.Button>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center gap-4">
              <p className="text-gray-500 dark:text-gray-400 self-center">
                No books found.
              </p>
            </div>
          )}
          <ui.Button onClick={open} variant="default">
            Add Book
          </ui.Button>
        </div>
      )}
    </div>
  );
}
