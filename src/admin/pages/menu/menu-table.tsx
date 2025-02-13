import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useMenu } from "@/admin/hooks/use-menu";
import CustomTooltip from "@/custom components/tooltip";
import VEG from "@/admin/assets/veg.jpg";
import NONVEG from "@/admin/assets/non-veg.jpg";
import Pagination from "@/custom components/pagination";

interface MenuTableProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuTable = ({ setOpenModal }: MenuTableProps) => {
  const { menu, getOneMenu, delMenu } = useMenu();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = menu.slice(firstIndex, lastIndex);

  return (
    <>
      <Card className="hidden md:block">
        <CardContent className="p-0 space-y-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-4 py-2">
                    <img
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1613360734521-adef8a377347?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8"
                      }
                      alt={item.menuName}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-2">{item.menuName}</TableCell>
                  <TableCell className="px-4 py-2 text-xs">
                    <img
                      src={item.foodType === "VEG" ? VEG : NONVEG}
                      alt={item.foodType}
                      className="w-4 h-4"
                    />
                    {/* {item.foodType} */}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {item?.foodCategory?.categoryName}
                  </TableCell>
                  <TableCell className="px-4 py-2">₹{item.price}</TableCell>
                  <TableCell className="px-4 py-2">
                    <Button
                      variant="outline"
                      className="h-8 px-2 text-purple-600 border-0 hover:bg-transparent bg-transparent"
                      onClick={() => {
                        setOpenModal(true);
                        getOneMenu(item.id);
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
                      onClick={() => delMenu(item.id)}
                    >
                      <CustomTooltip
                        trigger={<Trash2 size={16} />}
                        content="Delete"
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Pagination
        itemsPerPage={itemsPerPage}
        length={menu.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default MenuTable;
