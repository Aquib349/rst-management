import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "./data-table";
import CustomDailogComponent from "@/custom components/dailog";
import AddCategoryForm from "./add-category-form";
import { useCategory } from "@/admin/hooks/use-category";
import EditCategoryForm from "./edit-category-form";

const Category = () => {
  const { category, filterCategory } = useCategory();
  const [open, setOpen] = React.useState<boolean>(false);
  const [editCategoryModal, setEditCategoryModal] =
    React.useState<boolean>(false);

  return (
    <div className="w-full">
      <div className="flex space-x-2 items-center pb-4">
        <Input
          placeholder="Filter categoryNames..."
          className="max-w-sm"
          onChange={(e) => filterCategory(e.target.value)}
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
          title="Add Category"
          description=""
          content={<AddCategoryForm setOpen={setOpen} />}
          className="min-w-[180px]"
        />
      </div>
      <DataTable setEditCategoryModal={setEditCategoryModal} />
      <CustomDailogComponent
        open={editCategoryModal}
        onOpenChange={setEditCategoryModal}
        title="Edit Category"
        description=""
        content={
          <EditCategoryForm
            setEditCategoryModal={setEditCategoryModal}
            category={category}
          />
        }
        className="min-w-[180px]"
      />
    </div>
  );
};

export default Category;
