import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row } from 'react-bootstrap';
import { FilmTable } from './FilmTable';
import { SideBar } from './SideBar';
import { MyNavbar } from './MyNavbar';
import { useState, useEffect } from 'react';
import { AddFilmForm } from './AddFilmForm';
import { addNewFilm, deleteFilm, getFilmById, getUser, login, logout, updateFilmById } from './API';
import { Film } from './films';

import { LoginForm, LogoutButton } from './Auth';

let user = null;

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    // const [message, setMessage] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const loggedinUser = await getUser();
                debugger
                if (loggedinUser === null || loggedinUser === undefined) {
                    debugger
                    setLoggedIn(false)
                } else {
                    debugger
                    user = loggedinUser;
                    setLoggedIn(true);
                    debugger
                }
            } catch (err) {
                setLoggedIn(false);
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        // getExams();
    }, [loggedIn]);

    const handleLogin = async (credentials) => {
        try {
            const loggedinUser = await login(credentials);
            setLoggedIn(true);
            user = loggedinUser
            // setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });
        } catch (err) {
            console.log(err);
            // setMessage({ msg: err, type: 'danger' });
        }
    };

    const handleLogout = async () => {
        await logout();
        setLoggedIn(false);
        // clean up everything
        // setMessage('');
    };

    const addFilm = (name, fav, date, rate) => {
        return addnewFilm(name, fav, date, rate);
    }

    async function addnewFilm(name, fav, date, rate) {
        return await addNewFilm(name, fav, date, rate);
    }

    const updateRatingAction = (id, newRating) => {
        // filmLibrary.changeRating(id, newRating);
        // setFilms(() => filmLibrary.filmArray);
    }

    const updateFavAction = (id, fav) => {
        // filmLibrary.changeFav(id, fav);
        // setFilms(() => filmLibrary.filmArray);
    }

    const editFilmAction = async (id, title, fav, date, rating) => {
        await updateFilmById(id, new Film(id, title, fav, date, rating));
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' >
                    <Route path='/login' element={
                        loggedIn ? <Navigate replace to='/' /> : <LoginForm login={handleLogin} />} />
                    <Route path='films/all' element={!loggedIn ? <Navigate replace to='/login' /> : <FilmListLayout filterMode={"All"} handleLogout={handleLogout} loggedIn={loggedIn} />} />
                    <Route path='films/favorite' element={!loggedIn ? <Navigate replace to='/login' /> : <FilmListLayout filterMode={"Favorites"} handleLogout={handleLogout} loggedIn={loggedIn} />} />
                    <Route path='films/bestrated' element={!loggedIn ? <Navigate replace to='/login' /> : <FilmListLayout filterMode={"Best Rated"} handleLogout={handleLogout} loggedIn={loggedIn} />} />
                    <Route path='films/seenlastmonth' element={!loggedIn ? <Navigate replace to='/login' /> : <FilmListLayout filterMode={"Seen Last Month"} handleLogout={handleLogout} loggedIn={loggedIn} />} />
                    <Route path='films/unseen' element={!loggedIn ? <Navigate replace to='/login' /> : <FilmListLayout filterMode={"Unseen"} handleLogout={handleLogout} loggedIn={loggedIn} />} />
                    <Route path="" element={<Navigate to="films/all" replace />} />
                    <Route path='add' element={!loggedIn ? <Navigate replace to='/login' /> : <AddFilmForm addFilm={addFilm} />}> </Route>
                    <Route path='edit/:filmId' element={!loggedIn ? <Navigate replace to='/login' /> : <AddFilmForm editFilm={editFilmAction} />}> </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


function FilmListLayout(props) {
    const navigate = useNavigate();
    return (
        <Container>
            {/* {message && <Row>
                <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
            </Row>} */}
            <MyNavbar name={user.name} loggedIn={props.loggedIn} logout={props.handleLogout} />
            <Row>
                <SideBar class="collapse d-md-block col-md-3 col-12 bg-light below-nav"
                    id="left-sidebar" filterMode={props.filterMode} />

                <main class="col-md-9 col-12 below-nav">
                    <h1 class="mb-2" id="filter-title">{props.filterMode}</h1>

                    <FilmTable filterMode={props.filterMode} />
                    {true && <div align='right'><Button type='button' variant='outline-success' onClick={() => navigate('/add')}>Add</Button></div>}
                </main>
            </Row>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </Container>
    )
}

export default App;
