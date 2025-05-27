
import express from 'express';
import router from "./routes/userRoutes.js";
import logger from "./middleware/logger.js"

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Rotas
app.use('/api/users', userRoutes);

// Servidor
const host = "localhost";
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
});
