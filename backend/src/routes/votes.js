var express = require('express');
var router = express.Router();

module.exports = function(db) {

    router.post('/change', (req, res, next) => {
        var reqBody = req.body;
        var movieId = reqBody.id;

        let userId = req.user.dataValues.id;
        let newRating = 0.00;

        // delete vote
        db.vote.destroy({
            where: {
                userId: userId,
                movieId: movieId,
            }
        }).then(ret => {
            // add new vote
            return db.vote.create({
                userId: userId,
                movieId: movieId,
                stars: reqBody.stars,
            })
        }).then(ret => {

            // change movie total rating
            return db.vote.findAll({
                where: {
                    movieId: movieId,
                }
            });

        }).then(ret => {
            ret.forEach(element => {
                newRating += element.dataValues.stars;
            });

            newRating = newRating / ret.length;

            // update movie
            db.movie.findOne({
                where: {
                    id: movieId,
                }
            }).then(ret => {
                if (ret) {
                    ret.update({
                        rating: newRating,
                    })

                    res.json({ success: true, newRating: ret.rating });
                } else {
                    res.json({ success: false });
                }
            });
        });

    });

    return router;
}