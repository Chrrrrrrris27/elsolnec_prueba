import { Dispatch, SetStateAction, useMemo } from "react";
import { Post } from "src/lib/models/Post";
import { Button } from "../ui/button";
import { SkipBack, SkipForward } from "lucide-react";
import { getItemsPerPage } from "src/lib/utils/getItemsPerPage";

export default function PostsPagination({posts, currentPage, setCurrentPage, itemsPerPage}: {
  posts: Post[],
  currentPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
  itemsPerPage: number
}) {

  const totalPages = useMemo(() => getItemsPerPage(posts, itemsPerPage), [posts, itemsPerPage])

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handleSetPage = (index: number) => {
    setCurrentPage(index);
  }
  

  return (
    <div className="flex justify-center gap-2">
      <Button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <SkipBack />
      </Button>
      <div className="flex items-center gap-2">
        {
          Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => handleSetPage(index + 1)}
              variant={currentPage === index + 1 ? "outline": "default"}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </Button>
          ))
        }
      </div>
      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <SkipForward />
      </Button>
    </div>
  );
}