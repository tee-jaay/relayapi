import Crypto from 'crypto';
import ElectricBill from "../models/ElectricBill.model.js";


export const index = async (_req, res) => {
    try {
        const collections = await ElectricBill.find();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const store = async (req, res) => {
    const {
        title,
        name,
        unitNow,
        unitPrev,
        unitRate,
        charge,
        due,
        advance,
        amount,
        collectorName,
        paidDate,
        imageUrl,
        fileUrl,
    } = req.body;
    const newCollection = new ElectricBill({
        id: Crypto.randomUUID(),
        title,
        name,
        unitNow,
        unitPrev,
        unitRate,
        charge,
        due,
        advance,
        amount,
        collectorName,
        paidDate,
        imageUrl,
        fileUrl,
    });
    try {
        const savedEntry = await newCollection.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const show = async (req, res) => {
    try {
        const collection = await ElectricBill.find({ id: req.params.id });
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const update = async (req, res) => {
    const { id } = req.params;

    const {
        title,
        name,
        unitNow,
        unitPrev,
        unitRate,
        charge,
        due,
        advance,
        amount,
        collectorName,
        paidDate,
        imageUrl,
        fileUrl,
    } = req.body;

    try {
        await ElectricBill.findOneAndUpdate(
            { id: id },
            {
                title: title,
                name: name,
                unitNow: unitNow,
                unitPrev: unitPrev,
                unitRate: unitRate,
                charge: charge,
                due: due,
                advance: advance,
                amount: amount,
                collectorName: collectorName,
                paidDate: paidDate,
                imageUrl: imageUrl,
                fileUrl: fileUrl,
            }
        );
        const result = await ElectricBill.findOne({ id: id });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const destroy = async (req, res) => {
    try {
        const item = await ElectricBill.deleteOne({ id: req.params.id });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json(error);
    }
};

