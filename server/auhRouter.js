'use restrict';

var express = require('express');
const passport = require('passport');
const dao = require('./dao');

var router = express.Router();
const PREFIX = "/api/v1";

router.use((req, res, next) => {
    next()
})

//Login 
router.post(PREFIX + "/login",
    passport.authenticate('local'),
    async function (req, res, next) {
        try {
            const user = await dao.authenticateUser(req.body.username, req.body.password);
            return res.status(200).json(user);
        }
        catch (err) {
            console.log(err);
            if (err === "Unauthorized")
                return res.status(401).json("wrong email and/or password");

            return res.status(500).json(err);
        }
    });

//Get User 
router.get(PREFIX + "/user",
    async function (req, res, next) {
        try {
            const user = req.user
            if (user === null || user === undefined) {
                throw Error();
            }
            return res.status(200).json(user);
        }
        catch (err) {
            return res.status(403).json({ error: "Permission dinied." });
        }
    });


//Logout
router.post(PREFIX + "/logout", function (req, res, next) {
    try {
        req.logout(() => {
            return res.status(200).json();
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});


module.exports = router;
