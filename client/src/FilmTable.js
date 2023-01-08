import { Table } from "react-bootstrap";
import FilmRow from "./FilmRow";
import { useEffect, useState } from "react";
import { getAllFilms, getAllFavs, getAllBestRated, getAllSeenLastMonth, getAllUnseen, deleteFilm, updateFilmById } from "./API";


function FilmTable(props) {

    const [listOfFilms, setListOfFilms] = useState([])
    const [changed, setChanged] = useState(false)

    const removeFilm = async (filmId) => {
        try { 
            await deleteFilm(filmId);
            setListOfFilms((oldFilms) => (oldFilms.filter((film=>(film.id !== filmId)))));  
        } catch(e) { 
            //show an error message somewhere on the page..setErrorMsg(...) 
        } 
    } 

    const updateFilm = async (filmId, film) => {
        try { 
            await updateFilmById(filmId, film);
            setChanged(true)
        } catch(e) { 
            //show an error message somewhere on the page..setErrorMsg(...) 
        } 
    }

    useEffect(() => {
        //get films from server
        async function getAll() {
            setListOfFilms(await getAllFilms());
        }

        async function getFavs() {
            setListOfFilms(await getAllFavs());
        }

        async function getBestRated() {
            setListOfFilms(await getAllBestRated());
        }

        async function getSeenLastMonth() {
            setListOfFilms(await getAllSeenLastMonth());
        }

        async function getUnseen() {
            setListOfFilms(await getAllUnseen());
        }

        setChanged(false)
        switch (props.filterMode) {
            case 'All': {
                getAll();
                break;
            }
            case 'Favorites' : {
                getFavs();
                break
            }
            case 'Best Rated' : {
                getBestRated();
                break;
            }
            case 'Seen Last Month' : {
                getSeenLastMonth();
                break
            }   
            case 'Unseen' : {
                getUnseen();
                break;
            }
        }
    }, [props.filterMode, changed]);

    return <Table striped={true}>
        <thead>
            <tr>
                <th>Title</th>
                <th>Favorite</th>
                <th>Date</th>
                <th>Rating</th>
               
            </tr>
        </thead>
        <tbody>
            {listOfFilms.map((film) => (<FilmRow key={film.id} film={film} removeFilm={removeFilm} 
                updateFilm={updateFilm}/>))}

        </tbody>
    </Table> ;
}

export { FilmTable };