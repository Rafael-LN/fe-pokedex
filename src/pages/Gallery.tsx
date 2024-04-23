import {usePokemonContext} from "../context/PokemonsContext";
import {Container} from "react-bootstrap";
import {useEffect} from "react";
import PokemonList from "../components/PokemonList";

export function Gallery() {
    const {setIsPokedex} = usePokemonContext();

    useEffect(() => {
        setIsPokedex(false);
    }, [])

    return (
        <Container className="text-center">
            <PokemonList title={`Pokémon Gallery`}/>
        </Container>
    );
}