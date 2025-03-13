"use client"

import Link from "next/link";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getPosts } from "src/lib/api";

export default function PostList() {

  const { data: posts, error, isLoading } = useFetchQuery(
    ["posts"],
    getPosts,
  );

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;

  return (
    <ol>
      {
        posts?.map(post => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              {post.id} - {post.title} 
            </Link>
          </li>
        ))
      }
    </ol>
  );
}