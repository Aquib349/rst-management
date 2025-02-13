import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/custom components/form-field";
import { useTable } from "@/admin/hooks/use-table";
import { tableSchema } from "@/admin/schema/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddTableFormProps {
  setEditTableModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTableForm = ({ setEditTableModal }: AddTableFormProps) => {
  const { editTable, isPending, SingleTable } = useTable();
  const fields = [
    {
      name: "tableName",
      label: "Table Name",
      placeholder: "table name",
      type: "text",
    },
  ];
  const form = useForm<z.infer<typeof tableSchema>>({
    resolver: zodResolver(tableSchema),
    defaultValues: { tableName: "" },
  });

  const onsubmit = (values: z.infer<typeof tableSchema>) => {
    try {
      editTable(SingleTable.id, values);
      setEditTableModal(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  useEffect(() => {
    if (SingleTable) {
      form.reset({
        tableName: SingleTable?.tableName || "",
      });
    }
  }, [SingleTable, form]);
  return (
    <>
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
              fieldname={name as keyof z.infer<typeof tableSchema>}
              label={label}
              placeholder={placeholder}
              InputType={type}
            />
          ))}

          <Button
            type="submit"
            className="bg-purple-600 w-full hover:bg-purple-700"
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};
export default EditTableForm;
