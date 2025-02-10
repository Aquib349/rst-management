import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/custom components/form-field";
import { formSchema } from "@/schema/register";
import { Link, redirect } from "react-router";
import { post } from "@/services/utils/apiHelper";
import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";

const Register = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      inviteCode: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      setErrorMessage(null);
      try {
        const response = await post<{ isSuccess: boolean; message: string }>(
          "/api/v1/auth/register",
          values
        );

        if (response?.isSuccess) {
          redirect("/login");
        } else {
          setErrorMessage(response?.message);
        }
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again");
      }
    });
  };

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Your full name",
      type: "text",
    },
    { name: "email", label: "Email", placeholder: "Your email", type: "email" },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "Your phone number",
      type: "tel",
    },
    {
      name: "inviteCode",
      label: "Invite Code",
      placeholder: "Code",
      type: "text",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Password",
      type: "password",
    },
  ];

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-center font-semibold text-3xl py-4 text-purple-600">
        Register
      </h1>

      {errorMessage && (
        <p className="text-red-500 text-center mb-4 text-xs">{errorMessage}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button
            type="submit"
            className="bg-purple-600 w-full hover:bg-purple-700"
          >
            {isPending ? <LoaderCircle className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center space-x-2 py-4 text-sm">
        <span className="italic font-light">Already have an account?</span>
        <Link to="/login" className="text-purple-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
