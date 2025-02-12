import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <section className="auth-layout min-h-screen flex justify-center items-center custom-bg">
      <div className="w-96 mx-auto">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
