import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Root!');
});

app.get('/health', (req, res) => {
    res.status(200).json({ 'message': 'Success!' });
});

app.post('/ebills/create', (req, res) => {
    res.status(200).json({ 'message': 'Ebills create!' });
});
app.get('/ebills/index', (req, res) => {
    res.status(200).json({ 'message': 'Ebills index!' });
});
app.get('/ebills/show/:id', (req, res) => {
    res.status(200).json({ 'message': 'Ebills show!' });
});
app.put('/ebills/update/:id', (req, res) => {
    res.status(200).json({ 'message': 'Ebills update!' });
});
app.delete('/ebills/destroy/:id', (req, res) => {
    res.status(200).json({ 'message': 'Ebills destroy!' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});