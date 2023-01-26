// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/api/middleware/mongodb";
import InvoiceModel from "@/api/models/invoice";
import { getRandomId } from "@/utils/helper";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleInvoice(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  if (req.method === "GET") {
    try {
      const { status } = req.query;
      if (status) {
        const allInvoices = await InvoiceModel.find({})
          .sort({ createdAt: -1 })
          .where({
            status,
          });
        return res.status(200).json({
          data: allInvoices,
        });
      } else {
        const allInvoices = await InvoiceModel.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
          data: allInvoices,
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else if (req.method === "POST") {
    try {
      const body = req.body;
      const uniqueId = getRandomId();
      const newBody = { ...body, id: uniqueId };

      const newInvoice = await InvoiceModel.create(newBody);
      res.status(201).json({
        data: newInvoice,
        status: "success",
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
