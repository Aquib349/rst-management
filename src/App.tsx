import { Route, Routes } from "react-router";
import { AuthContextProvider } from "./admin/context/auth-context";
import AuthLayout from "./admin/layouts/auth-layout";
import Login from "./admin/pages/login";
import Register from "./admin/pages/register";
import PrivateRoute from "./admin/authentication/private-route";
import Sidebar from "./admin/layouts/sidebar";
import Dashboard from "./admin/pages/dashboard";
import Orders from "./admin/pages/orders";
import { CategoryContextProvider } from "./admin/context/category-context";
import { MenuContextProvider } from "./admin/context/menu-context";
import Menus from "./admin/pages/menu/menus";
import { TableContextProvider } from "./admin/context/table-context";
import RestaurantTable from "./admin/pages/table/table";
import Customer from "./customers/customer";
import Settings from "./admin/pages/settings";
import Category from "./admin/pages/category/category";

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

          {/* authentication based protected routes => admin panel */}
          <Route element={<PrivateRoute />}>
            {/* admin panel */}
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
              <Route
                path="table"
                element={
                  <TableContextProvider>
                    <RestaurantTable />
                  </TableContextProvider>
                }
              />
              <Route path="customer" element={<Customer />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* customer panel */}
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
