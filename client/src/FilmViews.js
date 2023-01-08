import { Row, Col } from 'react-bootstrap';

import FilmTable from './FilmTable';
import { LoginForm } from './Auth';

function DefaultRoute() {
  return(
    <>
      <Row>
        <Col>
          <h1>Nothing here...</h1>
          <p>This is not the route you are looking for!</p>
        </Col>
      </Row>
    </>
  );
}

function FilmRoute(props) {
  return(
    <>
      <Row>
        <Col>
          <FilmTable films={props.films} removeFilm={props.removeFilm} />
        </Col>
      </Row>
    </>
  );
}

function LoginRoute(props) {
  return(
    <>
      <Row>
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <LoginForm login={props.login} />
        </Col>
      </Row>
    </>
  );
}

export { FilmRoute, DefaultRoute, LoginRoute };