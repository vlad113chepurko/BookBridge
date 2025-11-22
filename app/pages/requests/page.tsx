"use client";
import { useQuery } from "@tanstack/react-query";
import { ui } from "@/components/ui/index";
import axios from "axios";
import type { Request } from "@/types/requests.types";

export default function RequestsPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found in local storage");
      }
      const res = await axios.get<Request[]>(
        `/api/requests/getUserReq?userId=${userId}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <ui.Spinner />;
  }
  if (error) {
    return <div>Error loading requests.</div>;
  }
  return (
    <div className="main">
      <h1 className="text-[3rem] font-extrabold dark:text-white">
        Requests Page
      </h1>
      <ul>
        {data?.map((request: Request) => (
          <li key={request._id} className="mb-4">
            <strong>{request.bookTitle}</strong> by {request.bookAuthor} -{" "}
            {request.requesterName} ({request.requesterEmail})
          </li>
        ))}
      </ul>
    </div>
  );
}
