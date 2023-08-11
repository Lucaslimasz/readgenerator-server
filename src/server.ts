import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/v1', router);

app.listen(PORT, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${PORT}/api/v1`)
});