import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCategory } from "@/hooks/use-category";
import { useMenu } from "@/hooks/use-menu";
import { formSchema } from "@/schema/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditMenuProps {
  SingleMenu: SingleMenu;
  setOpenEditMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SingleMenu {
  id: number;
  menuName: string;
  foodType: string;
  ingredientDetails: string;
  description: string;
  remarks: string;
  foodCategory: FoodCategory;
  image: string;
  price: number;
}

interface FoodCategory {
  id: number;
  categoryName: string;
  description: string;
}

const EditMenuForm = ({ SingleMenu, setOpenEditMenu }: EditMenuProps) => {
  const { editMenu } = useMenu();
  const { category } = useCategory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: "",
      foodType: "",
      ingredientDetails: "",
      description: "",
      remarks: "",
      foodCategoryId: 0,
      image: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (SingleMenu) {
      form.reset({
        menuName: SingleMenu.menuName || "",
        foodType: SingleMenu.foodType || "",
        ingredientDetails: SingleMenu.ingredientDetails || "",
        description: SingleMenu.description || "",
        remarks: SingleMenu.remarks || "",
        foodCategoryId: SingleMenu.foodCategory?.id || 0,
        image: SingleMenu.image || "",
        price: SingleMenu.price || 0,
      });
    }
  }, [SingleMenu, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    editMenu(SingleMenu.id, values);
    setOpenEditMenu(false);
  };

  const renderInputField = (
    name: keyof z.infer<typeof formSchema>,
    label: string,
    type = "text"
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel className="font-normal">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={label}
              {...field}
              onChange={(e) => {
                const value =
                  type === "number"
                    ? Number(e.target.value) || 0
                    : e.target.value;
                field.onChange(value);
              }}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 items-center gap-4">
          {renderInputField("menuName", "Menu Name")}

          <FormField
            control={form.control}
            name="foodType"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="font-normal">Food Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="VEG">Veg</SelectItem>
                    <SelectItem value="NONVEG">Non-Veg</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="foodCategoryId"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="font-normal">Food Category</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {category.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.categoryName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {renderInputField("price", "Price", "number")}

          <FormField
            control={form.control}
            name="ingredientDetails"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="font-normal">
                  Ingredient Details
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="ingredient info" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="font-normal">Remarks</FormLabel>
                <FormControl>
                  <Textarea placeholder="remarks" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="font-normal">Image</FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className="font-normal">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="description" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditMenuForm;
