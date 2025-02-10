import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CustomDailogComponent from "@/custom components/dailog";
import CustomTooltip from "@/custom components/tooltip";
import { useCategory } from "@/hooks/use-category";
import type { Category } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "categoryName",
    header: "Category Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("categoryName")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const { delCategory } = useCategory();
      const [open, setOpen] = useState<boolean>(false);

      return (
        <div className="flex items-center justify-between">
          <span className="lowercase">{row.getValue("description")}</span>
          <div className="flex space-x-8">
            <Button
              variant="outline"
              className="border-0 h-0 text-purple-600 hover:bg-transparent bg-transparent"
              onClick={() => setOpen(true)}
            >
              <CustomTooltip trigger={<Pencil size={16} />} content="Edit" />
              <CustomDailogComponent
                open={open}
                onOpenChange={setOpen}
                title="Edit Category"
                description=""
                content={<></>}
              />
            </Button>
            <Button
              onClick={() => delCategory(Number(row.original.id))}
              className="text-red-500 border-0 h-0 hover:bg-transparent bg-transparent"
            >
              <CustomTooltip trigger={<Trash size={16} />} content="Delete" />
            </Button>
          </div>
        </div>
      );
    },
  },
];
