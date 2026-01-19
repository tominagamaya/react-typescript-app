import { usePosts } from "../../hooks/usePosts";

export function PostList() {
  const { posts, loading, error } = usePosts();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.slice(0, 10).map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
