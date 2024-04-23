import {Container} from "react-bootstrap";
import PokemonList from "../components/PokemonList";


export default function Home() {
    return (
        <Container className={`text-center pt-4`}>
            <h1 className={`mb-5 display-1`}>Welcome to the Pokémon App</h1>
            <PokemonList />
        </Container>
    )
}