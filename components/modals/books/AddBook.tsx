"use client";
import ReactDOM from "react-dom";
import { useAddBookModalStore } from "@/store/useAddBookModalStore";
import { ui } from "@/components/ui/index";
import { useForm } from "react-hook-form";
import type { BookCreate } from "@/types/books.type";
import axios from "axios";
import { queryClient } from "@/lib/queryClient";

export default function AddBookModal() {
  const { isOpen, close } = useAddBookModalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<BookCreate>();

  const onSubmit = async (data: BookCreate) => {
    try {
      console.log(data);

      const ownerId = localStorage.getItem("userId");
      await axios.post("/api/books/addBook", {
        ownerId,
        title: data.title,
        author: data.author,
      });

      queryClient.invalidateQueries({ queryKey: ["me-books"] });

      reset();
      close();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <form onSubmit={handleSubmit(onSubmit)} className="modal">
      <div className="modal-content space-y-4">
        <div className="flex flex-row justify-between w-full">
          <h2 className="text-2xl  ">Add New Book</h2>
          <ui.Button variant="destructive" onClick={close}>
            Close
          </ui.Button>
        </div>
        <section>
          <ui.Label htmlFor="book-title">Book Title</ui.Label>
          <ui.Input
            {...register("title")}
            id="book-title"
            type="text"
            placeholder="Book Title"
          />
        </section>
        <section>
          <ui.Label htmlFor="book-author">Book Author</ui.Label>
          <ui.Input
            {...register("author")}
            id="book-author"
            type="text"
            placeholder="Book Author"
          />
        </section>

        <div className="flex justify-center mt-4 w-full">
          <ui.Button
            className="w-full"
            type="submit"
            variant="default"
            disabled={isSubmitting}
          >
            {isSubmitting ? <ui.Spinner /> : "Add Book"}
          </ui.Button>
        </div>
      </div>
    </form>,
    document.body
  );
}
