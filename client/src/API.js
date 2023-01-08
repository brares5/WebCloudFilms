import { Film } from "./films";

const APIURL = 'http://localhost:3001/api/v1';

async function login(credentials) {
    const url = APIURL + "/login";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });
    if (response.ok) {
        console.log("client: login returned ok from server");
        let user = await response.json();
        return user;
    } else {
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        } catch (err) {
            throw err;
        }
    }
}

async function logout() {
    const url = APIURL + "/logout"
    await fetch(url, {
        method: "POST",
        credentials: 'include'
    });
}

async function getUser() {
    const url = APIURL + '/user';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            return response.json();
        } else {
            return null;
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

async function getAllFilms() {
    const url = APIURL + '/films';
    try {
        const response = await fetch(url, {
            credentials: 'include',
        });
        if (response.ok) {
            // process the response
            const list = await response.json();
            const filmList = list.map((f) => new Film(f.id, f.title, f.favorite, f.date, f.rating));
            return filmList;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

async function getAllFavs() {
    const url = APIURL + '/favs';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            // process the response
            const list = await response.json();
            const filmList = list.map((f) => new Film(f.id, f.title, f.favorite, f.date, f.rating));
            return filmList;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

async function getAllBestRated() {
    const url = APIURL + '/bestrated';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            // process the response
            const list = await response.json();
            const filmList = list.map((f) => new Film(f.id, f.title, f.favorite, f.date, f.rating));
            return filmList;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

async function getAllSeenLastMonth() {
    const url = APIURL + '/seenlastmonth';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            // process the response
            const list = await response.json();
            const filmList = list.map((f) => new Film(f.id, f.title, f.favorite, f.date, f.rating));
            return filmList;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

async function getAllUnseen() {
    const url = APIURL + '/unseen';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            // process the response
            const list = await response.json();
            const filmList = list.map((f) => new Film(f.id, f.title, f.favorite, f.date, f.rating));
            return filmList;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

async function getFilmById(filmId) {
    const url = APIURL + '/films/' + filmId;
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            // process the response
            const list = await response.json();
            if (list.length > 0) {
                return list[0];
            } else {
                return null
            }
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

async function addNewFilm(filmTitle, filmFav, filmWatchDate, filmRating) {
    const url = APIURL + '/films';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: filmTitle,
                favorite: filmFav,
                date: filmWatchDate,
                rating: filmRating
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

async function updateFilmById(filmId, film) {
    const url = APIURL + '/films/update/' + filmId;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(film),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

async function deleteFilm(filmId) {
    const url = APIURL + '/films/delete/' + filmId;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

export {
    login, logout, getUser, getAllFilms, getAllFavs, getAllBestRated, getAllSeenLastMonth, getAllUnseen,
    getFilmById, addNewFilm, updateFilmById, deleteFilm
};