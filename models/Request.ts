import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookTitle: { type: String, required: true },
  bookAuthor: { type: String, required: true },
  requesterName: { type: String, required: true },
  requesterEmail: { type: String, required: true },
});

const Request = mongoose.model("Request", RequestSchema);
export default Request;
