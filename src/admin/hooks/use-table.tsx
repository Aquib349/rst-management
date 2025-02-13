import { TableContext } from "@/admin/context/table-context";
import { useContext } from "react";

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("table context must within the table provider");
  }
  return context;
};
