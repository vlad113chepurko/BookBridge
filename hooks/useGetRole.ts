import { useRole } from "@/store/useRole";
import axios from "axios";
import { useCallback } from "react";

export const useGetRole = () => {
  const { setRole } = useRole();

  const fetchUserRole = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const response = await axios.get(
        `/api/user/getUserRole?userId=${userId}`
      );
      setRole(response.data.role);
    } catch (error) {
      console.error(error);
    }
  }, [setRole]);

  return { fetchUserRole };
};
