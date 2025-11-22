import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  author: { type: String, required: true },
});

const Book = mongoose.model("Book", BookSchema);
export default Book;
