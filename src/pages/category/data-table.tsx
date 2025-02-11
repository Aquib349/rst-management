import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/custom components/pagination";
import CustomTooltip from "@/custom components/tooltip";
import { useCategory } from "@/hooks/use-category";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface DataTableProps {
  setEditCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataTable = ({ setEditCategoryModal }: DataTableProps) => {
  const { category, delCategory, getOneCategory } = useCategory();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const lastIndex = itemsPerPage * currentPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = category.slice(firstIndex, lastIndex);

  return (
    <>
      <Card>
        <CardContent className="p-0 space-y-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-4 py-2">
                      {item.categoryName}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {item.description}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      <Button
                        variant="outline"
                        className="h-8 px-2 text-purple-600 border-0 hover:bg-transparent bg-transparent"
                        onClick={() => {
                          setEditCategoryModal(true);
                          getOneCategory(Number(item.id));
                        }}
                      >
                        <CustomTooltip
                          trigger={<Pencil size={16} />}
                          content="Edit"
                        />
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 px-2 border-0 text-red-500 hover:bg-transparent bg-transparent"
                        onClick={() => delCategory(Number(item.id))}
                      >
                        <CustomTooltip
                          trigger={<Trash2 size={16} />}
                          content="Delete"
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Pagination
        itemsPerPage={itemsPerPage}
        length={category.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default DataTable;
