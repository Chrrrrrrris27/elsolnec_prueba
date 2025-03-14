"use client"

import { useEffect, useState } from "react";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getPosts } from "src/lib/api";
import { Post } from "src/lib/models/Post";
import PostsFilters from "./PostsFilters";
import PostCard from "./PostCard";
import { Loader } from "../ui/loader";
import PostsPagination from "./PostsPagination";
import { ErrorMessage } from "../ui/error_message";


const itemsPerPage = 10;

export default function PostList() {

  const [postsFiltered, setPostsFiltered] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: posts, error, isLoading } = useFetchQuery(
    ["posts"],
    getPosts,
  );

  useEffect(() => {

    if (posts) {
      const newPosts = posts.slice(((itemsPerPage * currentPage) - itemsPerPage), itemsPerPage * currentPage);
      setPostsFiltered(() => newPosts);
    }
  
  }, [currentPage, posts])
  
  

  if (isLoading) return <Loader isLoading/>;
  if (error) return <ErrorMessage/>;

  return (
    <div>
      {
        posts && postsFiltered.length > 0 &&
        <>
          <PostsFilters
            postsFiltered={postsFiltered}
            setPostsFiltered={setPostsFiltered}
          />
          <ol className="mt-5 flex flex-wrap gap-5">
            {
              postsFiltered?.map(post => (
                <li 
                  key={post.id}
                  className="flex-1 sm:flex-[0_1_30%] lg:flex-[0_1_23%] h-52 min-w-40"
                >
                  <PostCard
                    title={post.title}
                    userId={post.userId}
                    postId={post.id}
                  />
                </li>
              ))
            }
          </ol>
          <div className="mt-5">
            <PostsPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              posts={posts}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </>
      }
    </div>
  );
}