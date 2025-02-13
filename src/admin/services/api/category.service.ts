import { del, get, post, put } from "../utils/apiHelper";
import type { Category } from "@/types/types";

// Get all categories
export const getCategory = async (): Promise<Category[] | null> => {
  try {
    const response = await get<Category[]>("/v1/food-category");
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

// Get one categories
export const getSingleCategory = async (
  categoryId: number
): Promise<Category[] | null> => {
  try {
    const response = await get<Category[]>(`/v1/food-category/${categoryId}`);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

// add new categories
export const addCategory = async (data: any) => {
  try {
    const response = await post<{ message: string }>(
      "/v1/food-category/add",
      data
    );
    return response;
  } catch (error) {
    console.error("Error while adding categories :", error);
    return null;
  }
};

// update the existing category
export const updateCategory = async (categoryId: number, data: any) => {
  try {
    const response = await put<{ message: string }>(
      `/v1/food-category/update/${categoryId}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error while updating categories :", error);
    return null;
  }
};

// delete the exsiting category
export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await del<{ message: string }>(
      `/v1/food-category/delete/${categoryId}`
    );
    return response;
  } catch (error) {
    console.error("Error while deleting the category :", error);
    return null;
  }
};
