import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
    movieId: Number,
    userId: Number,
    stars: Number,
});

module.exports = mongoose.model('Vote', preferenceSchema);
