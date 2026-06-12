import { apiClient } from "@/lib/apiClient";
import type { Todo } from "@/types/Todo";

export const todoApi = {
  getAll: () =>
    apiClient({
      method: "GET",
      path: "/api/todos",
    }),
  create: (text: string) =>
    apiClient({
      method: "POST",
      path: "/api/todos",
      data: { text },
    }),
  update: (id: number, data: Todo) =>
    apiClient({
      method: "PUT",
      path: `/api/todos/${id}`,
      data: { data },
    }),
};
