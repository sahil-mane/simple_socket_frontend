import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

const getAllTodos = async () => {
  const res = await apiClient.post("/api/v1/todo/getAllTodo");
	console.log(res)
  return res?.data?.data;
};

export const useGetAllTodos = () => {
	return useQuery({
		queryKey: ["getAllTodos"],
		queryFn: getAllTodos,
	});
}

