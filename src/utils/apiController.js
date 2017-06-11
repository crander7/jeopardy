const pgModel = require('./../database/pgModel');

module.exports = {
    getGames: async (req, res) => {
        const games = await pgModel.getGames();
        res.json(games);
    }
};
