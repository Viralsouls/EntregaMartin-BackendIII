import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 8080;

// Conexión a MongoDB usando variable de entorno
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('✅ MongoDB conectado correctamente'))
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rutas principales
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

// Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));