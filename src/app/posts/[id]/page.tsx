"use client"

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Loader } from "src/components/ui/loader";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getPostById, getUsers } from "src/lib/api";
import { Post } from "src/lib/models/Post";
import { User } from "src/lib/models/User";

interface Params {
  id: string
}

export default function PostPage({ params }: { params: Promise<Params> }) {
  const { id } = use(params);
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User>();

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

  const { data: users } = useFetchQuery<User[]>(
    ["users"],
    getUsers,
    {
      initialData: queryClient.getQueryData(["users"])
    }
  );

  useEffect(() => {
    if (users && post) {
      const findedUser = users.find(user => user.id === post.userId);
      setUser(findedUser);
    }
  
  }, [users, post])

  if (isLoading) return <Loader isLoading/>;
  if (error) return <p>Error al cargar los usuarios</p>;

  return (
    <div>
      {
        post ?
        <div>
          <h1
            className="text-5xl font-bold capitalize"
          >
            {post.title}  
          </h1>
          <p className="mt-5">{post.body}</p>
          <h2 className="text-end font-medium">
            {user?.name}
          </h2>
          <div className="mt-15 flex justify-between items-center">
            <Link
              href={"/posts"}
              className="border-2 rounded-lg p-2 bg-primary-foreground border-primary text-primary inline-block hover:bg-primary hover:text-primary-foreground"
            >
              Publicaciones
            </Link>
            <Link
              href={`/posts/${id}/comments`}
              className="rounded-lg p-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
            >
                Ver Comentarios
            </Link>
          </div>
        </div>
        :
        <p>No se encontró el post</p>
      }
    </div>
  );
}