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
import { useCategory } from "@/hooks/use-category";
import { formSchema } from "@/schema/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddCategoryFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategoryForm = ({ setOpen }: AddCategoryFormProps) => {
  const { addNewCategory, isPending } = useCategory();
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
      addNewCategory(values);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

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

export default AddCategoryForm;
