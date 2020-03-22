const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    uid: String,
    stars: Number,
});

module.exports = {
    VoteSchema: voteSchema,
    Vote: mongoose.model('Vote', voteSchema),
}
