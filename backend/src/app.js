import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js';
import registroRoutes from './routes/registroRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', registroRoutes);

app.get('/', (req, res) => {
  res.send('API rodando 🎉');
});

export default app;
