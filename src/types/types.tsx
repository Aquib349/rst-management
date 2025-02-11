// type category
export type Category = {
  id: string;
  categoryName: string;
  description: string;
};

// type menu
export type Menu = {
  id: number;
  menuName: string;
  foodType: string;
  ingredientDetails: string;
  description: string;
  remarks: string;
  foodCategory: FoodCategory;
  image: string;
  price: number;
};

type FoodCategory = {
  id: number;
  categoryName: string;
  description: string;
};
