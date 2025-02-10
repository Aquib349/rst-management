import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "@/pages/category/column";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategory } from "@/hooks/use-category";
import type { Category } from "@/types/types";
import DataTable from "./data-table";
import CustomDailogComponent from "@/custom components/dailog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schema/category";
import CustomFormField from "@/custom components/form-field";
import { LoaderCircle } from "lucide-react";
import { Form } from "@/components/ui/form";

const Category = () => {
  const { category, isPending, addNewCategory } = useCategory();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [open, setOpen] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryName: "", description: "" },
  });

  const table = useReactTable({
    data: category || [],
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const onsubmit = (values: z.infer<typeof formSchema>) => {
    try {
      addNewCategory(values);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const fields = [
    {
      name: "categoryName",
      label: "Category Name",
      placeholder: "",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "",
      type: "text",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex space-x-2 items-center py-4">
        <Input
          placeholder="Filter categoryNames..."
          value={
            (table.getColumn("categoryName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("categoryName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setOpen(true)}
        >
          + Add Category
        </Button>
        <CustomDailogComponent
          open={open}
          onOpenChange={setOpen}
          title="Add New Category"
          description=""
          content={
            <Form {...form}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit(onsubmit)();
                }}
                className="space-y-4"
              >
                {fields.map(({ name, label, placeholder, type }) => (
                  <CustomFormField
                    key={name}
                    form={form}
                    fieldname={name as keyof z.infer<typeof formSchema>}
                    label={label}
                    placeholder={placeholder}
                    InputType={type}
                  />
                ))}
                <Button
                  type="submit"
                  className="bg-purple-600 w-full hover:bg-purple-700"
                >
                  {isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          }
          className="min-w-[180px]"
        />
      </div>
      <DataTable table={table} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Category;
