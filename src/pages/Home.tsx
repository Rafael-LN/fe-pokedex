import {Link} from "react-router-dom";
import {Button, Container} from "react-bootstrap";


export default function Home() {
    return (
        <Container>
            <Link to="/gallery">
                <Button >Gallery</Button>
            </Link>
            <Link to="/pokedex">
                <Button variant="danger">Pokedex</Button>
            </Link>
        </Container>
    )
}