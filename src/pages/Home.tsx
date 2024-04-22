import {Link} from "react-router-dom";
import {Button, Container} from "react-bootstrap";


export default function Home() {
    return (
        <Container className="align-items-center">
            <h1>Welcome to the Pokémon App</h1>
            <Link to="/gallery">
                <Button>Gallery</Button>
            </Link>
            <Link to="/pokedex">
                <Button variant="danger">Pokedex</Button>
            </Link>
        </Container>
    )
}