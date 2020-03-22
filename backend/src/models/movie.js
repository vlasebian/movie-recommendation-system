const mongoose = require('mongoose');
const VoteSchema = require('./vote').VoteSchema;

const movieSchema = new mongoose.Schema({
    title: { 
        type: String, 
    },
    description: {
        type: String,
        default: 'This movie does not have a description, yet.',
    },
    category: String,
    votes: [VoteSchema],
    rating: Number,
    image: String,
});

movieSchema.index({ "title": "text" });
module.exports = mongoose.model('Movie', movieSchema);
