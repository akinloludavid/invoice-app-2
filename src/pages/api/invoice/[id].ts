// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDB } from "@/api/middleware/mongodb";
import InvoiceModel from "@/api/models/invoice";
import type { NextApiRequest, NextApiResponse } from "next";
import { checkIsCensored } from "../utils/helpers";

export default async function handleInvoice(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id: paramId } = req.query;
  await connectDB();
  if (req.method === "GET") {
    try {
      const singleInvoice = await InvoiceModel.findOne({ id: paramId });
      if (!singleInvoice) {
        return res.status(404).json({
          data: null,
          message: "Invoice is missing",
        });
      }
      res.status(200).json({
        data: singleInvoice,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else if (req.method === "PUT") {
    try {
      const singleInvoice = await InvoiceModel.findOne({ id: paramId });
      if (!singleInvoice) {
        return res.status(404).json({
          status: "Not Found",
          data: null,
        });
      }
      const body = req.body;
      const newInvoice = await InvoiceModel.findOneAndUpdate(
        { id: paramId },
        { ...body },
        { new: true }
      );
      const isCensored = await checkIsCensored(newInvoice);
      if (isCensored["is-bad"]) {
        return res.status(400).json({
          message: "Inappropriate Content",
          status: "error",
        });
      } else {
        res.status(201).json({
          data: newInvoice,
          status: "success",
        });
      }
    } catch (error: any) {
      console.log("error");
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const singleInvoice = await InvoiceModel.findOne({ id: paramId });
      if (!singleInvoice) {
        return res.status(404).json({
          status: "Not Found",
          data: null,
        });
      }
      await InvoiceModel.deleteOne({ id: paramId });
      return res.status(200).json({
        message: "successfully deleted",
        success: true,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}
