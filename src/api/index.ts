import { baseUrl } from "@/utils/helper";
import { InvoiceType } from "@/utils/types";
import axios from "axios";

export const getInvoiceById = async (id: string) => {
  const res = await axios.get(`${baseUrl}/api/invoice/${id}`);
  return res.data.data || (res.data as InvoiceType);
};

export const getAllInvoices = async (status = "") => {
  const res = await axios.get(`${baseUrl}/api/invoices?status=${status}`);
  return res.data.data || (res.data as InvoiceType[]);
};

export const deleteInvoice = async (id: string) => {
  const res = await axios.delete(`${baseUrl}/api/invoice/${id}`);
  return res.data.data || res.data;
};

export const markAsPaid = async (body: InvoiceType) => {
  const res = await axios.put(`${baseUrl}/api/invoice/${body.id}`, body);
  return res.data.data || res.data;
};

export const updateInvoice = async (body: InvoiceType) => {
  const res = await axios.put(`${baseUrl}/api/invoice/${body.id}`, body);
  return res.data.data || res.data;
};

export const createInvoice = async (body: any) => {
  const res = await axios.post(`${baseUrl}/api/invoices`, body);
  return res.data.data || res.data;
};
