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
            // Si quieres todos los puntajes
            const items = await this.model.find().populate("userId", "displayName email");
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByUserId(req, res) {
        try {
            const scores = await this.model
                .find({ userId: req.params.userId })
                .sort({ date: -1 });
            res.status(200).json(scores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Ranking: mejores puntajes
    async getTop(req, res) {
        try {
            // topN = req.query.top (ej: ?top=5)
            const topN = parseInt(req.query.top) || 10;
            const scores = await this.model
                .find()
                .sort({ score: -1, date: 1 })
                .limit(topN)
                .populate("userId", "displayName email");
            res.status(200).json(scores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ScoreDAO;
