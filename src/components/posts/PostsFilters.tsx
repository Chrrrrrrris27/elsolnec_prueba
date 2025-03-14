import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "src/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "src/components/ui/dropdown-menu";
import { Input } from "src/components/ui/input";
import { Post } from "src/lib/models/Post";
import { getFilteredPosts, sortPostsByTitle } from "src/lib/utils/queryFilters";

export default function PostsFilters({postsFiltered, setPostsFiltered}: {
  postsFiltered: Post[],
  setPostsFiltered: Dispatch<SetStateAction<Post[]>>
}) {

  const [queryFilter, setQueryFilter] = useState<string>("");

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryFilter(e.target.value);
  }
  
  const handleCleanFilter = () => {
    setQueryFilter("");
    setPostsFiltered(postsFiltered);
  }

  const handleSortAscPosts = () => {
    setPostsFiltered((prevPosts) => sortPostsByTitle(true, prevPosts));
  }

  const handleSortDscPosts = () => {
    setPostsFiltered((prevPosts) => sortPostsByTitle(false, prevPosts));
  }

  useEffect(() => {
    if (queryFilter.length > 0) {
      const filteredPosts = getFilteredPosts(queryFilter, postsFiltered);
      setPostsFiltered(filteredPosts);
    } else {
      setPostsFiltered(postsFiltered);
    }
  
    
  }, [queryFilter, postsFiltered ,setPostsFiltered]) 

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