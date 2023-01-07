import express from 'express';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.route.js';
import electricBillRoutes from './routes/electric_bill.route.js';

const app = express();
app.use([
    bodyParser.json(),
    express.json()
]);

// Routes
app.get('/', (_req, res) => {
    res.send('Root!');
});

app.get('/health', (_req, res) => {
    res.status(200).json({ 'message': 'Success!' });
});
// Authentication
app.use('/auth', authRoutes);
// Electric bills
app.use('/electric-bills', electricBillRoutes);
// Routes

export default app;