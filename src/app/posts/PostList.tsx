"use client"

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getPosts } from "src/lib/api";

export default function PostList() {

  const { data: posts, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 10
  });

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