"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
export default function DashboardPage() {
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in local storage");
          return;
        }
        const response = await axios.get(
          `/api/user/getUserRole?userId=${userId}`
        );
        console.log("User Role:", response.data.role);
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    fetchUserRole();
  }, []);
  return (
    <div className="main">
      <h1 className="text-[3rem] font-extrabold  dark:text-white ">
        Dashboard
      </h1>
      <div className="mt-10 flex flex-col gap-6 justify-center  text-center">
        <Link href="/books" className="text-xl text-blue-600 hover:underline">
          View My Books
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
