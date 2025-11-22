import axios from "axios";
import type { UserRegister } from "@/types/auth.types";

export const useRegister = () => {
  const registerUser = async (userData: UserRegister, router: any) => {
    try {
      await axios.post("/api/auth/register", userData);
      router.push("/pages/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return { registerUser };
};
