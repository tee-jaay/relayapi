import mongoose from "mongoose";

const ElectricBillSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        title: { type: String },
        name: { type: String },
        unitNow: { type: String },
        unitPrev: { type: String },
        unitRate: { type: String },
        charge: { type: String },
        due: { type: String },
        advance: { type: String },
        amount: { type: String },
        collectorName: { type: String },
        paidDate: { type: String },
        imageUrl: { type: String },
        fileUrl: { type: String },
    },
    { timestamps: true }
);

const ElectricBill = mongoose.model("ElectricBill", ElectricBillSchema);

export default ElectricBill;