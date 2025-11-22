import { ui } from "@/components/ui/index";

export default function Home() {
  return (
    <main className="main">
      <h1 className="text-[3rem] font-extrabold  dark:text-white ">
        Welcome to <span className="text-blue-600">Book App</span>
      </h1>
      <h2 className="text-[2rem]">First of all you must login</h2>
      <ui.Button variant="default">Login</ui.Button>
    </main>
  );
}
