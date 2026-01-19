import { usePosts } from "../../hooks/usePosts";
export function PostList() {
  const { posts, hasMore, onLoadMore, loading, error } = usePosts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={onLoadMore} disabled={loading}>
          {loading ? "Loading..." : "もっとみる"}
        </button>
      )}
    </>
  );
}
