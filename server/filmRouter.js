var express = require('express');
const passport = require('passport');
const dao = require('./dao');

var router = express.Router();

function isLoggedIn(req, res, next) {
    console.log("user is" + req.user)
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: "Not logged in." });
}
// middleware that is specific to this router
router.use((req, res, next) => {
    next()
})


const PREFIX = '/api/v1';

router.get(PREFIX + '/films',
    isLoggedIn,
    (req, res) => {
        dao.readFilms(req.user.id).then(
            (value) => {
                res.json(value);
            }
        ).catch(
            (err) => {
                res.status(500).json({ error: err });
            }
        );
    });

router.get(PREFIX + '/favs',
    isLoggedIn,
    (req, res) => {
        dao.getFavs(req.user.id).then(
            (value) => {
                res.json(value);
            }
        ).catch(
            (err) => {
                res.status(500).json({ error: err });
            }
        );
    });

router.get(PREFIX + '/bestrated',
    isLoggedIn,
    (req, res) => {
        dao.getBestRated(req.user.id).then(
            (value) => {
                res.json(value);
            }
        ).catch(
            (err) => {
                res.status(500).json({ error: err });
            }
        );
    });

router.get(PREFIX + '/seenlastmonth',
    isLoggedIn,
    (req, res) => {
        dao.getSeenLastMonth(req.user.id).then(
            (value) => {
                res.json(value);
            }
        ).catch(
            (err) => {
                res.status(500).json({ error: err });
            }
        );
    });

router.get(PREFIX + '/unseen',
    isLoggedIn,
    (req, res) => {
        dao.getUnseen(req.user.id).then(
            (value) => {
                res.json(value);
            }
        ).catch(
            (err) => {
                res.status(500).json({ error: err });
            }
        );
    });


/// TODO: for any given id
router.get(PREFIX + '/films/:id',
    isLoggedIn,
    (req, res) => {
        dao.getById(req.params.id, req.user.id).then(
            (value) => {
                res.json(value);
            }
        ).catch(
            (err) => {
                res.status(500).json({ error: err });
            }
        );
    });

router.post(PREFIX + '/films',
    isLoggedIn,
    async (req, res) => {
        const film = req.body;
        try {
            const value = await dao.addFilm(film, req.user.id);
            res.end();
        } catch (e) {
            res.status(400).json({ error: e });
        }
    });

router.put(PREFIX + '/films/update/:id',
    isLoggedIn,
    async (req, res) => {
        const film = req.body;
        try {
            const value = await dao.updateFilm(req.params.id, film, req.user.id);
            res.end();
        } catch (e) {
            res.status(400).json({ error: e });
        }
    });

router.delete(PREFIX + '/films/delete/:id',
    isLoggedIn,
    async (req, res) => {
        try {
            const value = await dao.deleteFilm(req.params.id, req.user.id);
            res.end();
        } catch (e) {
            res.status(400).json({ error: e });
        }
    });


module.exports = router;
