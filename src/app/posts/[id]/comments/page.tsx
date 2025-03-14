"use client"

import { use } from "react";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getCommentsByPost, getPostById } from "src/lib/api";
import CommentForm from "../../../../components/posts/CommentForm";
import Comment from "src/components/posts/Comment";
import { Post } from "src/lib/models/Post";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "src/components/ui/loader";

interface Params {
  id: string,
}

export default function PostCommentsPage({ params }: { params: Promise<Params> }) {

  const { id } = use(params);

  const queryClient = useQueryClient();

  const cachedPosts = queryClient.getQueryData<Post[]>(["posts"]);

  const cachedPost = cachedPosts?.find(post => post.id.toString() === id);

  const { data: comments, error: commentsError, isLoading: commentsIsLoading } = useFetchQuery(
    ["posts", id, "comments"],
    () => getCommentsByPost(id),
  );

  const { data: post, error: postError, isLoading: postIsLoading } = useFetchQuery(
    ["posts", id],
    () => getPostById(id),
    {
      enabled: !cachedPost,
      initialData: cachedPost,
    }
  );

  if (commentsIsLoading || postIsLoading) return <Loader isLoading={commentsIsLoading || postIsLoading}/>;
  if (commentsError || postError) return <p>Error al cargar los usuarios</p>;

  return (
    <div>
      <h1 className="text-2xl">
        Comentarios de <span className="capitalize font-semibold">{post?.title}</span>
      </h1>
      <hr/>
      <ul>
        {
          comments?.map(comment => (
            <li
              key={comment.id}
              className="mt-3"
            >
              <Comment
                name={comment.name}
                email={comment.email}
                body={comment.body}
              />
            </li>
          ))
        }
      </ul>
      <CommentForm
        postId={id}
      />
    </div>
  );
}