const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const connectDB = require("./database/database");
const UserDAO = require("./dao/UserDAO");
const ScoreDAO = require("./dao/ScoreDAO"); // <-- Agregado

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("Server is running");
});

// --- Users ---
const userDAO = new UserDAO();
app.get("/api/v1/users/", (req, res) => userDAO.getAll(req, res));
app.post("/api/v1/users/", (req, res) => userDAO.create(req, res));

// --- Scores ---
const scoreDAO = new ScoreDAO();
app.get("/api/v1/scores/", (req, res) => scoreDAO.getAll(req, res));
app.post("/api/v1/scores/", (req, res) => scoreDAO.create(req, res));
// Ruta para TOP N puntajes
app.get("/api/v1/scores/top/:n", (req, res) => scoreDAO.getTop(req, res));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

connectDB();
