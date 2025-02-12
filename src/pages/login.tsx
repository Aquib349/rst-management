import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/custom components/form-field";
import { formSchema } from "@/schema/login";
import { forgotpasswordformSchema } from "@/schema/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router";
import { useState, useTransition } from "react";
import { post } from "@/services/utils/apiHelper";
import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle } from "lucide-react";
import CustomDailogComponent from "@/custom components/dailog";

const Login = () => {
  const { login } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotpasswordformSchema>>({
    resolver: zodResolver(forgotpasswordformSchema),
    defaultValues: { email: "" },
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

  const handleForgotPassword = (
    values: z.infer<typeof forgotpasswordformSchema>
  ) => {
    console.log(values);
    startTransition(async () => {
      setErrorMessage(null);

      try {
        const response = await post<{
          message: string;
        }>("/api/v1/auth/forgotPassword", values);
        console.log(response);
      } catch (error) {
        setErrorMessage("Bad Credentials, Please enter correct credentials");
      }
    });
  };

  return (
    <>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-center font-semibold text-3xl py-4 text-purple-600">
          Login
        </h1>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4 text-xs">
            {errorMessage}
          </p>
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
        <div className="flex flex-col items-center justify-end space-y-2 py-4 text-sm">
          <p
            className="hover:text-purple-600 hover:underline cursor-pointer"
            onClick={() => setOpenModal(true)}
          >
            Forgot Password
          </p>
          <div className="space-x-2">
            <span className="italic font-light">Don't have an account?</span>
            <Link to="/register" className="text-purple-600 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
      <CustomDailogComponent
        open={openModal}
        onOpenChange={setOpenModal}
        title="Reset Password"
        description="Reset your password with your registered email"
        content={
          <Form {...forgotPasswordForm}>
            <form
              onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
              className="space-y-4"
            >
              {[
                {
                  name: "email",
                  label: "Registered email",
                  placeholder: "email",
                  type: "email",
                },
              ].map(({ name, label, placeholder, type }) => (
                <CustomFormField
                  key={name}
                  form={forgotPasswordForm}
                  fieldname="email"
                  label={label}
                  placeholder={placeholder}
                  InputType={type}
                />
              ))}
              <Button
                type="submit"
                className="bg-purple-600 w-full hover:bg-purple-700"
              >
                {isPending ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        }
      />
    </>
  );
};

export default Login;
