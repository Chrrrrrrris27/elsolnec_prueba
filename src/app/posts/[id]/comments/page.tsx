"use client"

import { use } from "react";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getCommentsByPost } from "src/lib/api";
import CommentForm from "../../../../components/posts/CommentForm";

interface Params {
  id: string,
}

export default function PostCommentsPage({ params }: { params: Promise<Params> }) {

  const { id } = use(params);

  const { data: comments, error, isLoading } = useFetchQuery(
    ["posts", id, "comments"],
    () => getCommentsByPost(id),
  );

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;

  return (
    <div>
      {
        comments?.map(comment => (
          <div key={comment.id}>
            <h2>{comment.name}</h2>
            <p>{comment.body}</p>
          </div>
        ))
      }
      <CommentForm
        postId={id}
      />
    </div>
  );
}