const User = require("../models/User");

class UserDAO {
    constructor() {
        this.model = User;
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
            const items = await this.model.find();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByEmail(req, res) {
        try {
            const user = await this.model.findOne({ email: req.params.email });
            if (!user) return res.status(404).json({ error: "No encontrado" });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserDAO;
