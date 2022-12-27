import dotenv from "dotenv";
import express from 'express';
import contentfulClient from "./contentfulClient.js";
import contentfulManagementClient from "./contentfulManagementClient.js";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
    res.send('Root!');
});

app.get('/health', (_req, res) => {
    res.status(200).json({ 'message': 'Success!' });
});

app.post('/electric-bills/create', async (req, res) => {
    const { title,
        name,
        unitNow,
        unitPrev,
        unitRate,
        charge,
        due,
        advance,
        amount,
        paidDate,
        collectorName,
    } = req.body;
    try {
        await contentfulManagementClient.getSpace('a56nkt3d6e5p')
            .then((space) => space.getEnvironment('master'))
            .then((environment) => environment.createEntry('electricBill', {
                fields: {
                    "title": {
                        "en-US": title
                    },
                    "name": {
                        "en-US": name
                    },
                    "unitNow":
                    {
                        "en-US": unitNow
                    },
                    "unitPrev":
                    {
                        "en-US": unitPrev
                    },
                    "unitRate":
                    {
                        "en-US": unitRate
                    },
                    "charge": {
                        "en-US": charge
                    },
                    "due": {
                        "en-US": due
                    },
                    "advance":
                    {
                        "en-US": advance
                    },
                    "amount": {
                        "en-US": amount
                    },
                    "paidDate": {
                        "en-US": paidDate
                    },
                    "collectorName": {
                        "en-US": collectorName
                    }
                }
            }))
            .then((entry) => {
                entry.publish()
                    .then((entry) => {
                        console.log(`Entry ${entry.sys.id} published.`);
                    });
                return res.status(201).json({ 'message': `${entry.sys.id} is added!` });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ 'message': 'Entry adding failed!' });
            });
    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server error!' });
    }
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