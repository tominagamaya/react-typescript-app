import { Suspense } from "react";
import { PostList } from "../components/post/PostList";

function Home() {
  return (
    <Suspense fallback={<p>Initial Loading...</p>}>
      <div>Homeページ</div>
      <PostList />
    </Suspense>
  );
}

export default Home;
