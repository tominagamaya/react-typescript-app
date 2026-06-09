import { usePosts } from "../../hooks/usePosts";
export function PostList() {
  const { posts, hasMore, onLoadMore, isPending, error } = usePosts();

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ul>
        {posts.map((post, index) => (
          <li key={`${post.id}-${index}`}>{post.title}</li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={onLoadMore} disabled={isPending}>
          {isPending ? "Loading..." : "もっとみる"}
        </button>
      )}
    </>
  );
}
