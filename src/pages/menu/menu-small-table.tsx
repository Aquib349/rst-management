import { Card, CardContent } from "@/components/ui/card";
import { useMenu } from "@/hooks/use-menu";
import VEG from "@/assets/veg.jpg";
import NONVEG from "@/assets/non-veg.jpg";
import { Button } from "@/components/ui/button";
import CustomTooltip from "@/custom components/tooltip";
import { Pencil, Trash2 } from "lucide-react";

interface MenuTableProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FoodItemCard = ({ setOpenModal }: MenuTableProps) => {
  const { menu, getOneMenu, delMenu } = useMenu();

  return (
    <>
      {menu.map((item) => (
        <Card className="flex justify-between items-center md:hidden p-4 rounded-2xl w-auto">
          <img
            src={
              item.image ||
              "https://images.unsplash.com/photo-1613360734521-adef8a377347?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8"
            }
            alt="Hotdog"
            className="w-14 h-14 rounded-full object-cover mr-4"
          />

          <CardContent className="flex-1 p-0">
            <h3 className="text-lg font-semibold">{item.menuName}</h3>
            <div className="text-sm text-gray-600 flex space-x-2">
              <img
                src={item.foodType === "VEG" ? VEG : NONVEG}
                alt={item.foodType}
                className="w-4 h-4"
              />
              <p className="text-xs text-gray-600">
                {item.foodCategory.categoryName}
              </p>
            </div>
          </CardContent>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="h-8 px-2 text-purple-600 border-0 hover:bg-transparent bg-transparent"
              onClick={() => {
                setOpenModal(true);
                getOneMenu(item.id);
              }}
            >
              <CustomTooltip trigger={<Pencil size={16} />} content="Edit" />
            </Button>
            <Button
              variant="outline"
              className="h-8 px-2 border-0 text-red-500 hover:bg-transparent bg-transparent"
              onClick={() => delMenu(item.id)}
            >
              <CustomTooltip trigger={<Trash2 size={16} />} content="Delete" />
            </Button>
          </div>
        </Card>
      ))}
    </>
  );
};

export default FoodItemCard;
