import { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import type { Post } from "../types/Post";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: 動作確認用の遅延関数
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    setLoading(true);
    const load = async () => {
      try {
        await delay(1000);
        const data = await fetchPosts();
        if (data) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { posts, loading, error };
}
