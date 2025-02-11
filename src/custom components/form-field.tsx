import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface CustomFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fieldname: Path<T>;
  label: string;
  placeholder?: string;
  InputType: string;
}

const CustomFormField = <T extends FieldValues>({
  form,
  fieldname,
  label,
  placeholder,
  InputType,
}: CustomFormFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={fieldname}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={InputType}
              {...field}
              value={field.value ?? ""}
              placeholder={placeholder}
              className="rounded bg-transparent"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
