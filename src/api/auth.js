import { useMutation } from "@tanstack/react-query";
import apiClient from "../utils/apiClient.js";

const actionLogin = async (payload) => {
  const res = await apiClient.post("/api/v1/auth/login", payload);

  return res?.data;
};

export const useAuthLogin = () => {
  return useMutation({
    mutationKey: ["Login"],
    mutationFn: actionLogin,
  });
};
