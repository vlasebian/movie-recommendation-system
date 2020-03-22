var express = require('express');
var router = express.Router();

const Movie = require('../models/movie');
const Vote = require('../models/vote').Vote;

function updateTotalRating(movie) {
    let sumStars = 0;
    movie.votes.forEach(vote => {
        sumStars += vote.stars;
    });

    movie.rating = sumStars / movie.votes.length;
}

router.post('/change', async (req, res, next) => {
    let userId = 69;
    let movieId = req.body.movieId;
    let newVote = req.body.newVote;

    let movie = await Movie.findOne(
        {
            _id: movieId,
            votes: {
                $elemMatch: {
                    userId: userId,
                }
            }
        });

    console.log(movie);

    if (movie == null) {
        /* add new vote */
        movie = await Movie.findById(movieId);
        movie.votes.push(new Vote({
            userId: userId,
            stars: newVote,
        }));
    } else {
        /* update existing vote */
        movie.votes[0].stars = newVote;
        movie.votes[0].save();
    }

    updateTotalRating(movie);
    console.log(movie);

    movie.save();
    res.status(200).json({ success: true });
});

module.exports = router;
