import express from 'express';
import routes from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(routes)

try {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
} catch (error) {
    console.log(error)
}
