import dayjs from 'dayjs';
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
// dayjs.extend(isSameOrAfter);
// var duration = require('dayjs/plugin/duration')
// dayjs.extend(duration);


function Film(id, title, favorite = false, date, rating) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    // this.date = dayjs(date);
    this.date = (date !== null && date!== undefined) ? dayjs(date) : date;
    this.rating = rating;

    this.changeTitle = (newTitle) => {
        this.title = newTitle;
    }

    this.changeDate = (newDate) => {
        this.date = (newDate !== null && newDate!== undefined) ? dayjs(newDate) : newDate;
    }

    this.changeRating = (newRating) => {
        this.rating = newRating;
    }

    this.changeFav = (fav) => {
        this.favorite = fav;
    }
}

function ArrayOfFilms() {
    this.filmArray = [];

    this.count = 0;

    this.addNewFilm = (title, favorite, date, rating) => {
        this.filmArray.push(new Film (this.count, title, favorite, date, rating));
        this.count++;
    }

    this.print = () => {
        this.filmArray.forEach( (film, i) => {
            console.log(`${i+1}) ${film.id} - ${film.title} - ${film.date}`);
        })
    }


    this.sortByDate = () => {
        const new_array = [...this.filmArray];
        new_array.sort((f1, f2) => {
          if(f1.date === f2.date)
            return 0;    // works also for null === null
          else if(f1.date === null || f1.date === '')
            return 1;    // null/empty date is the lower value
          else if(f2.date === null || f2.date === '')
            return -1;
          else
            return f1.date.diff(f2.date)
        });
        return new_array;
      }

    this.deleteFilm = (id) => {
        this.filmArray = this.filmArray.filter((film) => film.id !== id);
    }

    this.resetWatchedFilms = () => {
        this.filmArray.forEach( (film) => {
            if (film.date !== undefined) {
                film.date = undefined;
            }
        });
    }

    this.getRated = () => {
        const ratedFilms = this.filmArray.filter((film => film.rating !== undefined));
        return ratedFilms.sort((a,b) => b.rating - a.rating);
    }

    this.changeRating = (filmId, newRating) => {
        this.filmArray.forEach( (film) => {
            if (film.id === filmId) {
                film.changeRating(newRating);
                return;
            }
        });
    }

    this.changeFav = (filmId, fav) => {
        this.filmArray.forEach( (film) => {
            if (film.id === filmId) {
                film.changeFav(fav);
                return;
            }
        })
    }

    this.editFilm = (filmId, newTitle, newFav, newDate, newRating) => {
        this.filmArray.forEach( (film) => {
            if (film.id === filmId) {
                film.changeTitle(newTitle)
                film.changeFav(newFav)
                film.changeDate(newDate)
                film.changeRating(newRating)
                return;
            }
        })
    }

    this.findFilmById = (filmId) => {
        for (var i in this.filmArray) {
            var film = this.filmArray[i];
            if (film.id === filmId) {
                return film;
            }
        }
    }
}

export {Film, ArrayOfFilms};