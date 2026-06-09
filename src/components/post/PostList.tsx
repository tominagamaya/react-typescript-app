import { usePosts } from "../../hooks/usePosts";
export function PostList() {
  const { posts, hasMore, onLoadMore, isPending } = usePosts();

  if (isPending) return <p>Loading...</p>;

  return (
    <>
      <ul>
        {posts.map((post, index) => (
          <li key={`${post.id}-${index}`}>{post.title}</li>
        ))}
      </ul>
      {hasMore && (
        <form action={onLoadMore}>
          <button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "もっとみる"}
          </button>
        </form>
      )}
    </>
  );
}
