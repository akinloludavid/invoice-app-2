import { InvoiceType } from "@/utils/types";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
} from ".";

export const useGetAllInvoices = (status = "") => {
  return useQuery({
    queryKey: ["all-invoices", status],
    queryFn: () => getAllInvoices(status),
  });
};

export const useGetInvoiceById = (id: string) => {
  return useQuery({
    queryKey: [`invoice-${id}`],
    queryFn: () => getInvoiceById(id),
  });
};

export const useDeleteInvoice = () => {
  return useMutation({
    mutationFn: (id: string) => deleteInvoice(id),
  });
};

export const useUpdateInvoice = () => {
  return useMutation({
    mutationFn: (body: InvoiceType) => updateInvoice(body),
  });
};
export const useCreateInvoice = () => {
  return useMutation({
    mutationFn: (body: any) => createInvoice(body),
  });
};
