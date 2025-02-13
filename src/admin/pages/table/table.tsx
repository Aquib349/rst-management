import { Button } from "@/components/ui/button";
import CustomDailogComponent from "@/custom components/dailog";
import { useState } from "react";
import DataTable from "./table-data";
import AddTableForm from "./add-table-form";
import EditTableForm from "./edit-table-form";

const RestaurantTable = () => {
  const [addTableModal, setAddTableModal] = useState<boolean>(false);
  const [editTableModal, setEditTableModal] = useState<boolean>(false);

  return (
    <>
      <div className="w-full">
        <div className="flex space-x-2 items-center pb-4">
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setAddTableModal(true)}
          >
            + Add Table
          </Button>
          <CustomDailogComponent
            open={addTableModal}
            onOpenChange={setAddTableModal}
            title="Add Table"
            description=""
            content={<AddTableForm setOpen={setAddTableModal} />}
            className="min-w-[180px]"
          />
        </div>
        <DataTable setEditTableModal={setEditTableModal} />
        <CustomDailogComponent
          open={editTableModal}
          onOpenChange={setEditTableModal}
          title="Edit Table"
          description=""
          content={<EditTableForm setEditTableModal={setEditTableModal} />}
          className="min-w-[180px]"
        />
      </div>
    </>
  );
};

export default RestaurantTable;
