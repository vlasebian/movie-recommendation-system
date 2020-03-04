const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'public/uploads' });

const User = require('../models/user');
const Movie = require('../models/movie');
const Preference = require('../models/preference');

module.exports = function(db) {

    /* GET movies by search term, order by rating */
    router.get('/search', (req, res, next) => {
        let movies = [];
        let movieIds = [];

        var searchTerm = req.query.term;
        if (searchTerm == null) {
            searchTerm = '';
        }

        await Preference.find({
            id: req.user.dataValues.id,
        }, async (err, res) => {
            if (err) throw new Error(err);

            return res;
        });

        db.liking.findOne({
            where: {
                id: req.user.dataValues.id,
            }
        }).catch(err => {
            throw new Error(err);
        }).then(ret => {
            return db.movie.findAndCountAll({
                where: {
                    movieName: {
                        [db.Sequelize.Op.substring]: searchTerm,
                    }
                },
                order: [
                    [db.Sequelize.literal("CASE category WHEN \'" + ret.dataValues.categoryOne +
                        "\' THEN 1 WHEN \'" + ret.dataValues.categoryTwo +
                        "\' THEN 2 WHEN \'" + ret.dataValues.categoryThree +
                        "\' THEN 3 ELSE 4 END, category")],
                    ['rating', 'DESC']
                ],
                // limit: 6,
            });
        }).catch(err => {
            throw new Error(err);
        }).then(ret => {

            ret.rows.forEach(element => {
                movies.push(element.dataValues);
                movieIds.push(element.dataValues.id);
            });

            return db.vote.findAll({
                where: {
                    userId: req.user.dataValues.id,
                    movieId: {
                        [db.Sequelize.Op.in]: movieIds,
                    }
                }
            }).catch(err => {
                throw new Error(err);
            });

        }).then(ret => {
            movies.forEach(movie => {
                ret.forEach(vote => {
                    if (vote.movieId == movie.id) {
                        movie['stars'] = vote.stars;
                    }
                })
            });

            return res.json(movies);
        });

    });

    /* GET top 6 rated movies */
    router.get('/recommendations', (req, res, next) => {
        let movies = [];
        let movieIds = [];

        db.liking.findOne({
            where: {
                id: req.user.dataValues.id,
            }
        }).catch(err => {
            throw new Error('getting likings failed', err);
        }).then(ret => {
            return db.movie.findAndCountAll({
                order: [
                    [db.Sequelize.literal("CASE category WHEN \'" + ret.dataValues.categoryOne +
                        "\' THEN 1 WHEN \'" + ret.dataValues.categoryTwo +
                        "\' THEN 2 WHEN \'" + ret.dataValues.categoryThree +
                        "\' THEN 3 ELSE 4 END, category")],
                    ['rating', 'DESC']
                ],
                // limit: 6,
            });
        }).catch(err => {
            throw new Error('finding movies failed', err);
        }).then(ret => {

            ret.rows.forEach(element => {
                movies.push(element.dataValues);
                movieIds.push(element.dataValues.id);
            });

            return db.vote.findAll({
                where: {
                    userId: req.user.dataValues.id,
                    movieId: {
                        [db.Sequelize.Op.in]: movieIds,
                    }
                }
            });
        }).then(ret => {
            movies.forEach(movie => {
                ret.forEach(vote => {
                    if (vote.movieId == movie.id) {
                        movie['stars'] = vote.stars;
                    }
                })
            });

            return res.json(movies);
        });
    });

    router.post('/', upload.single('image'), (req, res, next) => {
        var reqBody = req.body;

        db.movie.create({
            movieName: reqBody.title,
            stars: Number(reqBody.stars),
            description: reqBody.description,
            category: reqBody.category,
            rating: Number(reqBody.stars),
            imagePath: req.file.filename,
        }).then(ret => {
            let movieId = ret.dataValues.id;
            let userId = req.user.dataValues.id;

            return db.vote.create({
                movieId: movieId,
                userId: userId,
                stars: Number(reqBody.stars),
            })

        }).then(ret => {
            res.json({ success: true });
        });
    });

    router.get('/image', (req, res, next) => {
        var image = null;

        console.log(req.query.image);

        if (!req.query.image) image = 'movie-placeholder.png';
        else image = req.query.image;

        var imgPath = 'public/uploads/' + image;
        res.download(imgPath, err => {
            if (err) console.log(err);
        });
    });

    return router;
}