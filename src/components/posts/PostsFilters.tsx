import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "src/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "src/components/ui/dropdown-menu";
import { Input } from "src/components/ui/input";
import { Post } from "src/lib/models/Post";
import { getFilteredPosts, sortPostsByTitle } from "src/lib/utils/queryFilters";

export default function PostsFilters({setPostsFiltered}: {
  setPostsFiltered: Dispatch<SetStateAction<Post[]>>
}) {

  const queryClient = useQueryClient();
  const [queryFilter, setQueryFilter] = useState<string>("");

  const posts = queryClient.getQueryData<Post[]>(["posts"]);

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
  
    
  }, [queryFilter, posts, ,setPostsFiltered]) 

  return (
    <div className="flex flex-wrap gap-2 justify-end items-center">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="rounded-lg p-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
          >
            Ordenar por titulo
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                onClick={handleSortAscPosts}
                className="w-full"
              >
                Ascendente
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                onClick={handleSortDscPosts}
                className="w-full"
              >
                Descendente
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Input
        name="filter"
        value={queryFilter}
        onChange={handleQueryChange}
        placeholder="Filtrar por..."
        className="w-1xl"
      />
      <Button
        onClick={handleCleanFilter}
        variant={"outline"}
      >
        Limpiar
        <X className="text-destructive"/>
      </Button>
    </div>
  );
}