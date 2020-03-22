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

    return movie.rating;
}

router.post('/change', async (req, res, next) => {
    let uid = req.body.uid;
    let movieId = req.body.movie.id;
    let newVote = req.body.movie.stars;

    let movie = await Movie.findOne(
        {
            _id: movieId,
            votes: {
                $elemMatch: {
                    uid: uid,
                }
            }
        });

    if (movie == null) {
        /* add new vote */
        movie = await Movie.findById(movieId);
        movie.votes.push(new Vote({
            uid: uid,
            stars: newVote,
        }));
    } else {
        /* update existing vote */
        movie.votes[0].stars = newVote;
    }

    let newRating = updateTotalRating(movie);

    movie.save();
    res.status(200).json({ success: true, data: { rating: newRating } });
});

module.exports = router;
