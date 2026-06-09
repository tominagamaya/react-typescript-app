import { useEffect, useState, useTransition } from "react";
import { fetchPosts } from "../api/posts";
import type { Post } from "../types/Post";

const LIMIT_SIZE = 10;

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const load = async () => {
    startTransition(async () => {
      try {
        const data = await fetchPosts(page, LIMIT_SIZE);
        if (data) {
          setPosts((prevPosts) => [...prevPosts, ...data]);
          setPage((prevPage) => prevPage + 1);
          setHasMore(data.length === LIMIT_SIZE);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError((error as Error).message);
      }
    });
  };

  useEffect(() => {
    load();
  }, []);

  return { posts, isPending, error, hasMore, onLoadMore: load };
}
