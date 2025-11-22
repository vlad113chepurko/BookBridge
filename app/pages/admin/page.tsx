"use client";
import { useQuery } from "@tanstack/react-query";
import { ui } from "@/components/ui/index";
import { useRouter } from "next/navigation";
 
export default function AdminPage() {
  const route = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const response = await fetch("/api/admin/getAllUsers");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },
  });

  if (isLoading)
    return (
      <div>
        <ui.Spinner />
      </div>
    );
  if (error) return <div>Error loading users.</div>;

  return (
    <div className="main">
      <h1>Admin Page</h1>
      <ul className="bg-[#202020] border-1-white rounded-2xl p-5">
        {data.map((user: any) => (
          <li key={user._id}>
            <p>User name: {user.name}</p>
            <p>User email: {user.email}</p>
            <p>User password: {user.password}</p>
            <p>User role: {user.role}</p>
            <p>User ID: {user._id}</p>
            <br />
          </li>
        ))}
      </ul>
      <ui.Button onClick={() => route.push('/pages/register')}>Add User</ui.Button>
    </div>
  );
}
