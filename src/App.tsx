import { Route, Routes } from "react-router";
import Login from "./pages/login";
import Register from "./pages/register";
import AuthLayout from "./layouts/auth-layout";
import { AuthContextProvider } from "./context/auth-context";
import Sidebar from "./layouts/sidebar";
import PrivateRoute from "./authentication/private-route";
import Dashboard from "./pages/dashboard";
import Orders from "./pages/orders";
import Menus from "./pages/menu/menus";
import Category from "./pages/category/category";
import Settings from "./pages/settings";
import { CategoryContextProvider } from "./context/category-context";
import { MenuContextProvider } from "./context/menu-context";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          {/* login and register use auth-layout */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* authentication based protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Sidebar />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route
                path="menus"
                element={
                  <CategoryContextProvider>
                    <MenuContextProvider>
                      <Menus />
                    </MenuContextProvider>
                  </CategoryContextProvider>
                }
              />
              <Route
                path="category"
                element={
                  <CategoryContextProvider>
                    <Category />
                  </CategoryContextProvider>
                }
              />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
