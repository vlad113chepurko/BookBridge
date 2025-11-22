"use client";
import { ui } from "@/components/ui/index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/pages/dashboard");
    }
  }, [router]);
  return (
    <main className="main">
      <h1 className="text-[3rem] font-extrabold  dark:text-white ">
        Welcome to <span className="text-blue-600">Book App</span>
      </h1>
      <h2 className="text-[2rem]">First of all you must sign up</h2>
      <ui.Button
        onClick={() => router.push("/pages/register")}
        variant="default"
      >
        Sign up
      </ui.Button>
    </main>
  );
}
