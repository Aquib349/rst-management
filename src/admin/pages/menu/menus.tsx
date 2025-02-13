import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomDailogComponent from "@/custom components/dailog";
import MenuTable from "./menu-table";
import AddMenuForm from "./add-menu-form";
import EditMenuForm from "./edit-menu-form";
import { useMenu } from "@/admin/hooks/use-menu";
import FoodItemCard from "./menu-small-table";

export default function Menus() {
  const { SingleMenu, filterMenu } = useMenu();
  const [openAddMenu, setOpenAddMenu] = useState<boolean>(false);
  const [openEditMenu, setOpenEditMenu] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center">
        <Input
          className="text-2xl w-1/3"
          placeholder="Search menu"
          onChange={(e) => filterMenu(e.target.value)}
        />
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setOpenAddMenu(true)}
        >
          + Add Menu
        </Button>
      </div>

      {/* Menu Table */}
      <MenuTable setOpenModal={setOpenEditMenu} />
      <FoodItemCard setOpenModal={setOpenEditMenu} />

      <CustomDailogComponent
        open={openAddMenu}
        onOpenChange={setOpenAddMenu}
        title="Add Menu"
        description=""
        content={<AddMenuForm setOpenAddMenu={setOpenAddMenu} />}
        className="md:min-w-[700px] min-w-[100px] max-h-screen overflow-y-auto"
      />

      <CustomDailogComponent
        open={openEditMenu}
        onOpenChange={setOpenEditMenu}
        title="Edit Menu"
        description=""
        content={
          <EditMenuForm
            SingleMenu={SingleMenu}
            setOpenEditMenu={setOpenEditMenu}
          />
        }
        className="md:min-w-[700px] max-h-screen overflow-y-auto"
      />
    </>
  );
}
