import { Button, Table } from "react-bootstrap";
import { Checkbox, useState } from "react";
import MyRating from "./MyRating";
import { useNavigate} from 'react-router-dom';

function FilmRow(props){

    return <tr>
        <FilmData film={props.film} updateRating={props.updateRating} changeFav={props.changeFav} 
            updateFilm={props.updateFilm}/>
        <FilmActions film={props.film} removeFilm={props.removeFilm} />
    </tr>;
}

function FilmData(props) {

    const [isFav, setIsFav] = useState(props.film.favorite);

    return <>
        <td id={`film${props.film.id}`} style={isFav ? {color:"#FF0000"} : {color:"#000000"}}>{props.film.title}</td>
        <td>
            <span class="custom-control custom-checkbox col-md-1 col-3"> 
                <input type="checkbox" class="custom-control-input" id="check-f1" defaultChecked={props.film.favorite} onChange={(e)=>{
                    const fav = e.target.checked
                    props.film.favorite = fav;
                    props.updateFilm(props.film.id, props.film)
                    setIsFav(fav)}}/> 
                <label class="custom-control-label" for={`check-f${props.film.id}`}>Favorite</label> 
            </span>
        </td>
        <td>{(props.film.date !== null && props.film.date !== undefined && props.film.date.isValid()) ? props.film.date.format('YYYY-MM-DD') : ""}</td>
        <td>
            <MyRating value={props.film.rating} onChange={(oldRating, newRating) => {
                if (oldRating !== newRating) {
                    props.film.rating = newRating;
                    props.updateFilm(props.film.id, props.film)
                }
            }} />
        </td>
    </>;
}

function FilmActions(props) {
    const navigate = useNavigate() ; 
    return <td>
        <Button variant='outline-danger' onClick={(event) => props.removeFilm(props.film.id)}>🗑</Button> &nbsp;
        <Button variant='outline-warning' onClick={() => {
            navigate('/edit/' + props.film.id);
            }}>✏</Button> &nbsp;
    </td> ;

}

export default FilmRow;
