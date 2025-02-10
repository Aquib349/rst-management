import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/custom components/form-field";
import { formSchema } from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router";
import { useState, useTransition } from "react";
import { post } from "@/services/utils/apiHelper";
import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      setErrorMessage(null);

      try {
        const response = await post<{
          accessToken: string;
          message: string;
          data: {
            fullName: string;
            email: string;
            phone: string;
            role: string;
          };
        }>("/api/v1/auth/login", values);

        if (response?.accessToken) {
          login(response?.accessToken);
          localStorage.setItem("user", response?.data?.fullName);
          localStorage.setItem("email", response?.data?.email);
        } else {
          setErrorMessage(response?.message);
        }
      } catch (error) {
        setErrorMessage("Bad Credentials, Please enter correct credentials");
      }
    });
  };

  const fields = [
    { name: "email", label: "Email", placeholder: "Your email", type: "email" },
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
        Login
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
      <div className="flex items-center justify-end space-x-2 py-4 text-sm">
        <span className="italic font-light">Don't have an account?</span>
        <Link to="/register" className="text-purple-600 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
