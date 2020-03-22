const mongoose = require('mongoose');
const VoteSchema = require('./vote').VoteSchema;

const movieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        /* index needed for searching by title */
        index: true, 
    },
    description: {
        type: String,
        default: 'This movie does not have a description, yet.',
    },
    category: String,
    votes: [VoteSchema],
    rating: Number,
    imagePath: String,
});

module.exports = mongoose.model('Movie', movieSchema);
