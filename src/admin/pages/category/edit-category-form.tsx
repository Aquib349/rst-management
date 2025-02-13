import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import CustomFormField from "@/custom components/form-field";
import { useCategory } from "@/admin/hooks/use-category";
import { formSchema } from "@/admin/schema/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Category } from "@/types/types";

interface AddCategoryFormProps {
  setEditCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  category: Category[];
}

const EditCategoryForm = ({ setEditCategoryModal }: AddCategoryFormProps) => {
  const { editCategory, isPending, singleCategory } = useCategory();
  const fields = [
    {
      name: "categoryName",
      label: "Category Name",
      placeholder: "category name",
      type: "text",
    },
  ];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryName: "", description: "" },
  });

  const onsubmit = (values: z.infer<typeof formSchema>) => {
    try {
      editCategory(singleCategory.id, values);
      setEditCategoryModal(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  useEffect(() => {
    if (singleCategory) {
      form.reset({
        categoryName: singleCategory.categoryName || "",
        description: singleCategory.description || "",
      });
    }
  }, [singleCategory, form]);

  return (
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="write something.." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-purple-600 w-full hover:bg-purple-700"
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EditCategoryForm;
