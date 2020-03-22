const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    userId: Number,
    stars: Number,
});

module.exports = {
    VoteSchema: voteSchema,
    Vote: mongoose.model('Vote', voteSchema),
}
