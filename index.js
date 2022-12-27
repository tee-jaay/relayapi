import dotenv from "dotenv";
import express from 'express';
import contentfulClient from "./contentfulClient.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
    res.send('Root!');
});

app.get('/health', (_req, res) => {
    res.status(200).json({ 'message': 'Success!' });
});

app.post('/electric-bills/create', (req, res) => {
    res.status(201).json({ 'message': 'Ebills create!' });
});
app.get('/electric-bills/index', async (_req, res) => {
    let ebillsArr = [];
    var singleEbill = {};
    try {
        await contentfulClient.getEntries().then(function (entries) {
            //
            entries.items.forEach(function (entry) {
                if (entry.fields) {
                    singleEbill = { ...entry.fields, ...{ id: entry.sys.id } };
                    ebillsArr.push(singleEbill);
                    // console.log(entry.fields);
                }
            });
        });
        res.status(200).json(ebillsArr);
    } catch (error) {
        res.status(500).json(error);
    }
});
app.get('/electric-bills/show/:id', (req, res) => {
    res.status(200).json({ 'message': 'Ebills show!' });
});
app.put('/electric-bills/update/:id', (req, res) => {
    res.status(203).json({ 'message': 'Ebills update!' });
});
app.delete('/electric-bills/destroy/:id', (req, res) => {
    res.status(204).json({ 'message': 'Ebills destroy!' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});