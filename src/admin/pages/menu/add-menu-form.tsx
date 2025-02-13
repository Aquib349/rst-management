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
import { convertImageToBase64 } from "@/admin/constants/image-convertion";
import { useCategory } from "@/admin/hooks/use-category";
import { useMenu } from "@/admin/hooks/use-menu";
import { formSchema } from "@/admin/schema/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddMenuFormProps {
  setOpenAddMenu: React.Dispatch<SetStateAction<boolean>>;
}

const AddMenuForm = ({ setOpenAddMenu }: AddMenuFormProps) => {
  const { category } = useCategory();
  const { addNewMenu } = useMenu();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: "",
      foodType: "",
      ingredientDetails: "",
      description: "",
      remarks: "",
      foodCategoryId: 0,
      image: undefined,
      price: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    addNewMenu(values);
    setOpenAddMenu(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid md:grid-cols-2 items-center gap-2">
            <FormField
              control={form.control}
              name="menuName"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="font-normal">Menu Name</FormLabel>
                  <FormControl className="mx-0">
                    <Input placeholder="name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

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
                    defaultValue={field.value ? field.value.toString() : ""}
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

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="font-normal">Price</FormLabel>
                  <FormControl className="mx-0">
                    <Input
                      type="number"
                      placeholder="price"
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ingredientDetails"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="font-normal">
                    Ingredient Details
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ingredient info"
                      className=""
                      {...field}
                    />
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
            render={() => (
              <FormItem className="space-y-0">
                <FormLabel className="font-normal">Image</FormLabel>
                <FormControl className="mx-0">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const base64Image = await convertImageToBase64(file);
                          form.setValue("image", base64Image, {
                            shouldValidate: true,
                          });
                        } catch (error) {
                          console.error("Image conversion error:", error);
                        }
                      }
                    }}
                  />
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
                  <Textarea placeholder="description" className="" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddMenuForm;
