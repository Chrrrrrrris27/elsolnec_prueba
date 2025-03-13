"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "src/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "src/components/ui/dropdown-menu";
import { useFetchQuery } from "src/hooks/useFetchQuery";
import { getPosts } from "src/lib/api";
import { Post } from "src/lib/models/Post";
import { getFilteredPosts, sortPostsByTitle } from "src/lib/utils/queryFilters";

export default function PostList() {

  const [queryFilter, setQueryFilter] = useState<string>("");
  const [postsFiltered, setPostsFiltered] = useState<Post[]>([]);

  const { data: posts, error, isLoading } = useFetchQuery(
    ["posts"],
    getPosts,
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryFilter(e.target.value);
  }
  
  const handleCleanFilter = () => {
    setQueryFilter("");
    if (posts) {
      setPostsFiltered(posts);
    }
  }

  const handleSortAscPosts = () => {
    setPostsFiltered((prevPosts) => sortPostsByTitle(true, prevPosts));
  }

  const handleSortDscPosts = () => {
    setPostsFiltered((prevPosts) => sortPostsByTitle(false, prevPosts));
  }

  useEffect(() => {
    if (queryFilter.length > 0 && posts) {
      const filteredPosts = getFilteredPosts(queryFilter, posts);
      setPostsFiltered(filteredPosts);
    } else {
      setPostsFiltered(posts || []);
    }
  
    
  }, [queryFilter, posts])  

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;

  return (
    <div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>Ordenar por titulo</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                onClick={handleSortAscPosts}
              >
                Ascendente
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={handleSortDscPosts}
              >
                Descendente
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <input
          name="filter"
          value={queryFilter}
          onChange={handleQueryChange}
        />
        <Button
          onClick={handleCleanFilter}
        >
          Limpiar filtros
        </Button>
      </div>  
      <ol>
        {
          postsFiltered?.map(post => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                {post.id} - {post.title}
              </Link>
            </li>
          ))
        }
      </ol>
    </div>
  );
}