"use strict";

const authRouter = require("./auhRouter");
const filmRouter = require("./filmRouter");
const express = require('express');
const dao = require('./dao');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');


const app = express();
app.use((req, res, next) => {
    next()
})
app.use(express.json());
app.disable('etag');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(email, password, cb) {
    const user = await dao.getUserByEmail(email);
    if (user === undefined || user === null) {
        return cb(null, false, 'Incorrect username or password.');
    }

    return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (user, cb) {
    return cb(null, user);
});

app.use(session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));
app.use('', authRouter);
app.use('', filmRouter);

app.listen(3001, () => { console.log("Server started") });
