import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useTransition,
} from "react";
import type { Table } from "@/admin/types/types";
import { z } from "zod";
import {
  addTable,
  deleteTable,
  downloadTableQR,
  getSingleTable,
  getTables,
  updateTable,
} from "@/admin/services/api/table.service";
import { tableSchema } from "@/admin/schema/table";

interface TableContextProps {
  table: Table[];
  SingleTable: any;
  isPending: boolean;
  getOneTable: (tableId: number) => void;
  delTable: (tableId: number) => void;
  addNewTable: (values: z.infer<typeof tableSchema>) => void;
  editTable: (menuId: number, data: any) => void;
  downloadQR: () => void;
}

export const TableContext = createContext<TableContextProps | undefined>(
  undefined
);

interface TableProviderProps {
  children: ReactNode;
}

export const TableContextProvider: React.FC<TableProviderProps> = ({
  children,
}) => {
  const [table, setTable] = useState<Table[]>([]);
  const [SingleTable, setSingleTable] = useState<Table[]>([]);
  const [isPending, startTransition] = useTransition();

  // function to get all tables
  function getAllTable() {
    startTransition(async () => {
      try {
        const response = await getTables();
        if (response) {
          setTable(response);
        }
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      }
    });
  }

  // function to get one table
  function getOneTable(tableId: number) {
    startTransition(async () => {
      try {
        const response = await getSingleTable(tableId);
        if (response) setSingleTable(response);
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      }
    });
  }

  // Function to add a new table
  function addNewTable(values: z.infer<typeof tableSchema>) {
    startTransition(async () => {
      try {
        await addTable(values);
        getAllTable();
      } catch (error) {
        console.error("Failed to add new table :", error);
      }
    });
  }

  // function to delete the table
  function delTable(tableId: number) {
    startTransition(async () => {
      try {
        await deleteTable(tableId);
        getAllTable();
      } catch (error) {
        console.error("Failed to delete table:", error);
      }
    });
  }

  // function to edit the table
  function editTable(tableId: number, data: any) {
    startTransition(async () => {
      try {
        await updateTable(tableId, data);
        getAllTable();
      } catch (error) {
        console.error("Failed to update table:", error);
      }
    });
  }

  // function to download the qr-code of table
  function downloadQR() {
    startTransition(async () => {
      await downloadTableQR();
    });
  }

  useEffect(() => {
    getAllTable();
  }, []);
  return (
    <TableContext.Provider
      value={{
        table,
        SingleTable,
        isPending,
        getOneTable,
        delTable,
        addNewTable,
        editTable,
        downloadQR,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
