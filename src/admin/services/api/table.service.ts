import { downloadPdf } from "@/admin/constants/image-convertion";
import { del, get, post, put } from "../utils/apiHelper";
import type { Table } from "@/types/types";

// Get all tables
export const getTables = async (): Promise<Table[] | null> => {
  try {
    const response = await get<Table[]>("/v1/table");
    return response;
  } catch (error) {
    console.error("Error fetching tables :", error);
    return null;
  }
};

// get single table details
export const getSingleTable = async (
  tableId: number
): Promise<Table[] | null> => {
  try {
    const response = await get<Table[]>(`/v1/table/${tableId}`);
    return response;
  } catch (error) {
    console.error("Error fetching table :", error);
    return null;
  }
};

// download the table-qr
export const downloadTableQR = async () => {
  const response = await get<{ pdfFile: string }>("/v1/table/download-qr");

  if (response?.pdfFile) {
    downloadPdf(response.pdfFile, "Table_QR.pdf");
  }
};

// add new table
export const addTable = async (data: any) => {
  try {
    const response = await post<{ message: string }>("/v1/table/add", data);
    return response;
  } catch (error) {
    console.error("Error while adding table :", error);
    return null;
  }
};

// update the existing table
export const updateTable = async (tableId: number, data: any) => {
  try {
    const response = await put<{ message: string }>(
      `/v1/table/update/${tableId}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error while updating table :", error);
    return null;
  }
};

// delete the exsiting table
export const deleteTable = async (tableId: number) => {
  try {
    const response = await del<{ message: string }>(
      `/v1/table/delete/${tableId}`
    );
    return response;
  } catch (error) {
    console.error("Error while deleting the table :", error);
    return null;
  }
};
