"use client";
import Link from "next/link";
import { useGetRole } from "@/hooks/useGetRole";
import { useRole } from "@/store/useRole";
import { useEffect } from "react";
export default function DashboardPage() {
  const { fetchUserRole } = useGetRole();
  const userRole = useRole((state) => state.role);
  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]);
  return (
    <div className="main">
      <h1 className="text-[3rem] font-extrabold  dark:text-white ">
        Dashboard
      </h1>
      <div className="mt-10 flex flex-row gap-6 justify-center  text-center">
        <Link href="/books" className="text-xl text-blue-600 hover:underline">
          View My Books
        </Link>
        <Link
          href="/books/all-books"
          className="text-xl text-blue-600 hover:underline"
        >
          View All Books
        </Link>
        <Link
          href="/pages/requests"
          className="text-xl text-blue-600 hover:underline"
        >
          View My Requests
        </Link>
        <Link
          hidden={userRole !== "admin"}
          href="/pages/admin"
          className="text-xl text-blue-600 hover:underline"
        >
          Go to Admin Panel
        </Link>
      </div>
    </div>
  );
}
