import {useEffect} from "react";
import {Container} from "react-bootstrap";
import {usePokemonContext} from "../context/PokemonsContext";
import PokemonList from "../components/PokemonList";

export function Pokedex() {
    const {setIsPokedex} = usePokemonContext();

    useEffect(() => {
        setIsPokedex(true);
    }, []);

    return (
        <Container className={`text-center`}>
            <PokemonList title={`Pokedex`}/>
        </Container>
    );
}