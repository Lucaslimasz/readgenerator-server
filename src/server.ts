import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './router';

import mongoose from 'mongoose'

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/v1', router);

mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
    console.log('🔋 Banco conectado')
    app.listen(PORT, () => {
        console.log(`🚀 Servidor conectado: ${PORT}`)
    });
}).catch((err) => {
    console.log('error ao conectar no MongoDB')
    console.log(err)
})
