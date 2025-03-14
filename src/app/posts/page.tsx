import PostList from "../../components/posts/PostList";

export default function PostsPage() {
  return (
    <main>
          <h1 className="font-bold text-center text-5xl mb-5 break-words">Publicaciones</h1>
          <PostList/>
    </main>
  );
}