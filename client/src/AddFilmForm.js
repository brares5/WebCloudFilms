import { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { getFilmById } from "./API";
import { Film } from "./films";
import MyRating from "./MyRating";
import dayjs from 'dayjs';

function AddFilmForm(props) {
    const defaultName = '';
    const defaultFav = false;
    const defaultDate = '';
    const defaultRate = 0;

    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [targetFilm, setTargetFilm] = useState();


    useEffect(() => {

        async function getFilm(id) {
            const film = await getFilmById(id)
            fillFields(new Film(film.id, film.title, film.favorite, film.date, film.rating));
            setLoading(false)
        }
        if (params.filmId) {
            getFilm(parseInt(params.filmId))
        } else {
            fillFields()
            setLoading(false)
        }
    }, [])

    const [name, setName] = useState();
    const [fav, setFav] = useState();
    const [date, setDate] = useState();
    const [rating, setRating] = useState();

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (targetFilm) {
            await props.editFilm(targetFilm.id, name, fav, date === "" ? undefined : date, parseInt(rating));
        } else {
            await props.addFilm(name, fav, date === "" ? undefined : date, parseInt(rating));
        }
        fillFields()
        navigate('/films/all');
    }

    function fillFields(film) {
        setTargetFilm(film)
        setName(film ? film.title : defaultName);
        setFav(film ? film.favorite : defaultFav);
        setDate((film && film.date) ? dayjs(film.date).format('YYYY-MM-DD') : defaultDate);
        setRating(film ? film.rating : defaultRate);
    }

    return <>
        <div style={{ borderColor: 'grey', borderWidth: 2, borderStyle: 'dotted', padding: 10 }}>

            {!loading &&

                <Form onSubmit={handleSubmit}>

                    <Form.Group className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' value={name} required={true} onChange={(event) => { setName(event.target.value) }} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Check type='checkbox' label='Favorite' defaultChecked={fav} onChange={(event) => { setFav(event.target.checked) }} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Date</Form.Label>
                        <Form.Control type='date' value={date} onChange={(event) => { setDate(event.target.value) }} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Rating</Form.Label>
                        <MyRating value={rating} required={true} onChange={(oldRating, newRating) => {
                            setRating(newRating)
                        }} />
                        {/* <Form.Control type='number' value={rating}  min={0} max={5} onChange={ (event) => { setRating(event.target.value)}} /> */}
                    </Form.Group>

                    <div align='right'>
                        <Button variant='outline-secondary' onClick={() => navigate('/films/all')}>Cancel</Button>
                        <Button type='submit' variant='outline-success'>{targetFilm ? "Save" : "Add"}</Button>
                    </div>
                </Form>
            }


        </div>
    </>

}


export { AddFilmForm };