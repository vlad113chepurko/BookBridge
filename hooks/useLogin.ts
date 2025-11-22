import axios from "axios";
import type { UserLogin } from "@/types/auth.types";

export const useLogin = () => {
  const loginUser = async (userData: UserLogin, router: any) => {
    try {
      const res = await axios.post("/api/auth/login", userData);
      const token = res.data.token;
      localStorage.setItem("authToken", token);
      router.push("/pages/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return { loginUser };
};
