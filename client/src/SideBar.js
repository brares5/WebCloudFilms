import {Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SideBar(props) {

    const navigate = useNavigate();

    const changeFilter = (filterName) => {
        switch (filterName) {
            case 'All': {
                navigate("/films/all")
                break;
            }
            case 'Favorites' : {
                navigate("/films/favorite")
                break;
            }
            case 'Best Rated' : {
                navigate("/films/bestrated")
                break;
            }
            case 'Seen Last Month' : {
                navigate("/films/seenlastmonth")
                break;
            }   
            case 'Unseen' : {
                navigate("/films/unseen")
                break;
            }
        }

    }

    const aside =
    <aside class={props.class} id={props.id}>
        <div class="list-group list-group-flush">
            <TabItem id="filter-all" class="list-group-item list-group-item-action active" title="All" changeFilter={changeFilter}/>
            <TabItem id="filter-favorites" class="list-group-item list-group-item-action" title="Favorites" changeFilter={changeFilter}/>
            <TabItem id="filter-best" class="list-group-item list-group-item-action" title="Best Rated" changeFilter={changeFilter}/>
            <TabItem id="filter-seen-last-month" class="list-group-item list-group-item-action" title="Seen Last Month" changeFilter={changeFilter}/>
            <TabItem id="ffilter-unseen" class="list-group-item list-group-item-action" title="Unseen" changeFilter={changeFilter}/>
        </div>
    </aside>

    // var tabElms = aside.querySelectorAll('a[data-bs-toggle="list"]')
    // tabElms.forEach(function(tabElm) {
    //     tabElm.addEventListener('shown.bs.tab', function (event) {
    //         // event.target // newly activated tab
    //         // event.relatedTarget // previous active tab
    //         props.changeFilter(tabElm.innerHTML)
    //     })
    // })

    return (aside)
}

function TabItem(props) {

    return (
        <Button id={props.id} class={props.class} onClick={()=>{props.changeFilter(props.title)}}>{props.title}</Button> 
    )

}

export { SideBar };