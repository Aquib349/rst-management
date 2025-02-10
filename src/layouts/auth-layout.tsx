import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <section className="auth-layout min-h-screen flex justify-center items-center custom-bg">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4 rounded-lg shadow-lg">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
