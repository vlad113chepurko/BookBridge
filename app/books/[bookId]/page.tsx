"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ui } from "@/components/ui/index";
import { useParams } from "next/navigation";

export default function BookPage() {
  const params = useParams();
  const bookId = params?.bookId;

  const sendReq = async () => {
    try {
      const response = await axios.post("/api/requests/sendReq", {
        bookId: bookId,
        bookTitle: book.title,
        bookAuthor: book.author,
        requesterId: localStorage.getItem("userId"),
      });
      console.log(response);
      alert("Request sent successfully");
    } catch (error) {
      alert("Failed to send request");
    }
  };

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const response = await axios.get(`/api/books/${bookId}`);
      return response.data;
    },
    enabled: !!bookId,
  });

  if (isLoading) return <ui.Spinner />;
  if (error) return <div>Error loading book data.</div>;
  if (!book) return <div>Book not found.</div>;

  return (
    <div className="main">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p className="text-lg text-muted-foreground">Автор: {book.author}</p>
      <p>ID: {bookId}</p>
      <ui.Button
        disabled={localStorage.getItem("userId") === book.ownerId}
        onClick={sendReq}
        className="cursor-pointer"
      >
        Request this Book
      </ui.Button>
    </div>
  );
}
