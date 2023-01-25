import mongoose from "mongoose";
const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  postCode: String,
  country: String,
});

const InvoiceSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    paymentDue: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    paymentTerms: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: false,
    },
    clientName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "pending", "draft"],
    },
    total: {
      type: Number,
    },
    items: {
      type: [{ name: String, quantity: String, price: Number, total: Number }],
    },
    clientAddress: {
      type: AddressSchema,
      required: true,
    },
    senderAddress: {
      type: AddressSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const InvoiceModel =
  mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);

export default InvoiceModel;
