const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'public/uploads' });

const User = require('../models/user');
const Movie = require('../models/movie');
const Vote = require('../models/vote').Vote;

/* GET movies by search term, order by rating */
router.get('/search', async (req, res, next) => {
    var uid = req.query.uid;
    var term = req.query.term;

    /* get user preferences */
    let result = await User.findById(uid);
    let preferences = result.preferences;

    /* get movies */
    let movies = await Movie.aggregate([
        {
            $match: { $text: { $search: term } },
        },
        { 
            $project: {
                '_id': true,
                'title': true,
                'description': true,
                'category': true,
                'rating': true,
                'votes': {
                    /* get the user's vote for the movie */
                    '$map': {
                        'input': {
                            '$filter': {
                                'input': '$votes',
                                'as': 'vote',
                                'cond': { $eq: [ '$$vote.uid', uid ] }
                            },
                        },
                        'as': 'vote',
                        'in': {
                            'stars': '$$vote.stars',
                        },
                    },
                },
                'image': true,
                'priority': {
                    $switch: {
                        branches: [
                            { case: { $eq : [ '$category', preferences[0] ] }, then: 1 },
                            { case: { $eq : [ '$category', preferences[1] ] }, then: 2 },
                            { case: { $eq : [ '$category', preferences[2] ] }, then: 3 },
                        ], default: 4
                    }
                }
            }
        },
        {
            $sort: {
                priority: 1,
                rating: 1,
            }
        },
        {
            $limit: 6,
        }

    ]);

    return res.status(200).json({ success: true, data: movies });
});

/* GET top 6 rated movies */
router.get('/recommendations', async (req, res, next) => {
    let uid = req.query.uid;

    /* get user preferences */
    let result = await User.findById(uid, { preferences: 1 });
    let preferences = result.preferences;

    /* get movies */
    let movies = await Movie.aggregate([
        { 
            $project: {
                '_id': true,
                'title': true,
                'description': true,
                'category': true,
                'rating': true,
                'votes': {
                    /* get the user's vote for the movie */
                    '$map': {
                        'input': {
                            '$filter': {
                                'input': '$votes',
                                'as': 'vote',
                                'cond': { $eq: [ '$$vote.uid', uid ] }
                            },
                        },
                        'as': 'vote',
                        'in': {
                            'stars': '$$vote.stars',
                        },
                    },
                },
                'image': true,
                'priority': {
                    $switch: {
                        branches: [
                            { case: { $eq : [ '$category', preferences[0] ] }, then: 1 },
                            { case: { $eq : [ '$category', preferences[1] ] }, then: 2 },
                            { case: { $eq : [ '$category', preferences[2] ] }, then: 3 },
                        ], default: 4
                    }
                }
            }
        },
        {
            $sort: {
                priority: 1,
                rating: 1,
            }
        },
        {
            $limit: 6,
        }

    ]);

    return res.status(200).json({ success: true, data: movies });
});

router.post('/add', upload.single('image'), async (req, res, next) => {
    let newMovie = new Movie({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        image: req.file.filename,
        votes: [],
        rating: 0,
    });

    await newMovie.save(function (err) {
        if (err) {
            next(err);
        }
    });

    res.status(200).json({ success: true });
});

router.get('/image', (req, res, next) => {
    var image = null;

    if (!req.query.image) image = 'movie-placeholder.png';
    else image = req.query.image;

    var imgPath = 'public/uploads/' + image;

    res.status(200).download(imgPath, err => {
        if (err) next(err);
    });
});

module.exports = router;