"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
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

  const { data: post, error, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
    enabled: !cachedPost,
    initialData: cachedPost,
    staleTime: 1000 * 60 * 10
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;

  return (
    <div>
      {
        post ?
        <div>
          <h1>{post?.title}</h1>
          <p>{post.body}</p>
        </div>
        :
        <p>No se encontró el post</p>
      }
    </div>
  );
}