import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="main">
      <h1 className="text-[3rem] font-extrabold  dark:text-white ">
        Dashboard
      </h1>
      <div className="mt-10">
        <Link
          href="/pages/books/me"
          className="text-xl text-blue-600 hover:underline"
        >
          View My Books
        </Link>
      </div>
    </div>
  );
}
