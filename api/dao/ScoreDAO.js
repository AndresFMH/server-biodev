const Score = require("../models/Score");

class ScoreDAO {
    constructor() {
        this.model = Score;
    }

    async create(req, res) {
        try {
            const document = this.model(req.body);
            await document.save();
            res.status(201).json(document);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            // Trae todos los scores, sin populate
            const items = await this.model.find();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Busca por email en vez de userId
    async getByEmail(req, res) {
        try {
            const scores = await this.model
                .find({ email: req.params.email })
                .sort({ createdAt: -1 });
            res.status(200).json(scores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Ranking: mejores puntajes
    async getTop(req, res) {
        try {
            // topN = req.query.top (ej: ?top=5)
            const topN = parseInt(req.query.top) || 3; // Cambia 10 por 3 si quieres el top 3 por defecto
            const scores = await this.model
                .find()
                .sort({ score: -1, createdAt: 1 })
                .limit(topN);
            res.status(200).json(scores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ScoreDAO;
