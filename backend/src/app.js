import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API rodando 🎉');
});

export default app;
