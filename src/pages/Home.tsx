import {Link} from "react-router-dom";
import {Button, Container, Row} from "react-bootstrap";


export default function Home() {
    return (
        <Container className={`text-center pt-4`}>
            <h1 className={`my-4`}>Welcome to the Pokémon App</h1>
            <Row>
                <Link className={`my-3`} to="/gallery">
                    <Button size={`lg`} variant={`info`}>Open the Gallery</Button>
                </Link>
                <Link to="/pokedex">
                    <Button size={`lg`} variant={`secondary`}>Check your Pokedex</Button>
                </Link>
            </Row>

        </Container>
    )
}