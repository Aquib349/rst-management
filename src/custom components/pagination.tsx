import { Button } from "@/components/ui/button";

interface PaginationProps {
  itemsPerPage: number;
  length: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  itemsPerPage,
  length,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const totalpages = Math.ceil(length / itemsPerPage);
  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage < length) {
      setCurrentPage(currentPage + 1);
    }
  }
  return (
    <div className="absolute right-4 bottom-0 flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={previousPage}
        disabled={currentPage <= 1 ? true : false}
      >
        Previous
      </Button>
      <span>{currentPage}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={nextPage}
        disabled={currentPage === totalpages ? true : false}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
