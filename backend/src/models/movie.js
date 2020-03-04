import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: String,
    description: {
        type: String,
        default: 'This movie does not have a description, yet.',
    },
    category: String,
    rating: Number,
    imagePath: String,
});

module.exports = mongoose.model('Movie', movieSchema);
