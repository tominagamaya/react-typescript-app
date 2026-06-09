import { use, useActionState } from "react";
import { fetchPosts } from "../api/posts";
import type { Post } from "../types/Post";

const LIMIT_SIZE = 10;

interface PostsState {
  posts: Post[];
  page: number;
  hasMore: boolean;
}

const initialPostsPromise = fetchPosts(1, LIMIT_SIZE);

export function usePosts() {
  const initialData = use(initialPostsPromise) || [];

  const [state, loadMoreAction, isPending] = useActionState<PostsState>(
    async (prevState) => {
      try {
        const data = await fetchPosts(prevState.page, LIMIT_SIZE);
        return {
          posts: [...prevState.posts, ...data],
          page: prevState.page + 1,
          hasMore: data.length === LIMIT_SIZE,
        };
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        return prevState;
      }
    },
    { posts: initialData, page: 2, hasMore: true },
  );

  return {
    posts: state.posts,
    isPending,
    hasMore: state.hasMore,
    onLoadMore: loadMoreAction,
  };
}
