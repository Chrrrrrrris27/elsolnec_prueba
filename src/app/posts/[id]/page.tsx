"use client"

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { use } from "react";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getPostById } from "src/lib/api";
import { Post } from "src/lib/models/Post";

interface Params {
  id: string
}

export default function PostPage({ params }: { params: Promise<Params>}) {
  const { id } = use(params);
  const queryClient = useQueryClient();

  const cachedPosts = queryClient.getQueryData<Post[]>(["posts"]);

  const cachedPost = cachedPosts?.find(post => post.id.toString() === id);

  const { data: post, error, isLoading } = useFetchQuery(
    ["posts", id],
    () => getPostById(id),
    {
      enabled: !cachedPost,
      initialData: cachedPost,
    }
  );

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;

  return (
    <div>
      {
        post ?
        <div>
          <h1>{post?.title}</h1>
          <p>{post.body}</p>
          <Link href={`/posts/${id}/comments`}>
              Ver Comentarios
          </Link>
        </div>
        :
        <p>No se encontró el post</p>
      }
    </div>
  );
}