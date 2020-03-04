import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
    userId: Number,
    categoryOne: String,
    categoryTwo: String,
    categoryThree: String,

});

module.exports = mongoose.model('Preference', preferenceSchema);
