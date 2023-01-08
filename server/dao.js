'use strict';

const sqlite = require('sqlite3');
const crypto = require("crypto");
const { Film } = require('./films');

const PASSWORD_LENGTH = 32;

const db = new sqlite.Database('films.db', (err) => {
    if (err) {
        throw err;
    }
});

function authenticateUser(email, password) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT *
            FROM users
            WHERE email=?`;
        db.get(sql, [email], (err, row) => {
            if (err) {
                reject(err);
                return;
            } else if (row === undefined || row === null) {
                reject("Unauthorized");
                return;
            }

            const user = {
                id: row.id,
                name: row.name,
                email: row.email
            }

            const salt = row.salt;
            crypto.scrypt(password, salt, PASSWORD_LENGTH, (err, hashedPassword) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword)) {
                    reject("Unauthorized");
                    return
                } else {
                    resolve(user);
                }
            });
        });
    });
}

function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT *
            FROM users
            WHERE email=?`;
        db.get(sql, [email], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            const user = {
                id: row.id,
                email: row.email,
                name: row.name
            }
            resolve(user);
        });
    });
}

function readFilms(userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM films WHERE user = ?';
        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log(rows)
                resolve(rows.map((f) =>
                    new Film(f.id, f.title, f.favorite, f.watchdate, f.rating),
                ));
            }
        });
    });
}

function getFavs(userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from films WHERE favorite == 1 AND user = ?';
        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows.map((f) =>
                    new Film(f.id, f.title, f.favorite, f.watchdate, f.rating),
                ));
            }
        });
    });
}

function getBestRated(userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from films WHERE rating == 5 AND user = ?';
        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows.map((f) =>
                    new Film(f.id, f.title, f.favorite, f.watchdate, f.rating),
                ));
            }
        });
    });
}

function getSeenLastMonth(userId) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * from films WHERE watchdate <= DATE('now') AND watchdate >= DATE('now','-30 day') AND user = ?`;
        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows.map((f) =>
                    new Film(f.id, f.title, f.favorite, f.watchdate, f.rating),
                ));
            }
        });
    });
}

function getUnseen(userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from films WHERE watchdate IS NULL AND user = ?';
        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows.map((f) =>
                    new Film(f.id, f.title, f.favorite, f.watchdate, f.rating),
                ));
            }
        });
    });
}

function getById(id, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * from films where id=? AND user = ?';
        db.all(sql, [id, userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows.map((f) =>
                    new Film(f.id, f.title, f.favorite, f.watchdate, f.rating),
                ));
            }
        });
    });
}

function addFilm(film, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO films (title, favorite, watchdate, rating, user) VALUES(?,?,?,?,?)';
        db.run(sql, [film.title, film.favorite, film.date, film.rating, userId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function updateFilm(filmId, film, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET title=?, favorite=?, watchdate=?, rating=? WHERE id = ? AND user = ?';
        db.run(sql, [film.title, film.favorite, film.date, film.rating, filmId, userId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function tickFavFilm(id, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE films SET favorite = CASE WHEN favorite=0 THEN 1 WHEN favorite=1 THEN 0 END WHERE id = ? AND user = ?';
        db.run(sql, [id, userId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteFilm(id, userId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE from films WHERE id = ? AND user = ?';
        db.run(sql, [id, userId], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = {
    authenticateUser, getUserByEmail, readFilms, addFilm, getFavs, getBestRated, getSeenLastMonth, getUnseen,
    getById, updateFilm, tickFavFilm, deleteFilm
};