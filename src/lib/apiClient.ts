import { API_BASE_URL } from "@/constants/api";

type Props<T = unknown> = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  data?: T;
};

export const apiClient = async ({ method = "GET", path, data }: Props) => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("APIリクエストに失敗しました");
  }
  return res.json();
};
