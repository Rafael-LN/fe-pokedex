import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {usePokemonContext} from "../context/PokemonsContext";
import {useEffect, useState} from "react";

export function MyProgress() {
    const navigate = useNavigate();
    const {pokemons, allPokemonsCount} = usePokemonContext();

    const [percentageCaught, setPercentageCaught] = useState<string>('');
    const [remainingPokemon, setRemainingPokemon] = useState(0);
    const [totalCaughtPokemon, setTotalCaughtPokemon] = useState(0);

    useEffect(() => {
        // Calculate progress based on caught Pokémon count and total Pokémon count
        const caughtPokemonsCount = pokemons.filter(pokemon => pokemon.caught).length;
        const remainingPokemon = allPokemonsCount - caughtPokemonsCount;
        const percentage = ((caughtPokemonsCount / allPokemonsCount) * 100).toFixed(2);
        setPercentageCaught(percentage);
        setTotalCaughtPokemon(caughtPokemonsCount);
        setRemainingPokemon(remainingPokemon);

    }, [pokemons, allPokemonsCount]);


    const goBack = () => {
        navigate(-1);
    }

    return (
        <Container>
            <Button onClick={goBack}>
                Go Back
            </Button>

            <h2>Pokédex Progress</h2>
            <p>Total Pokémon Caught: {totalCaughtPokemon}</p>
            <p>Percentage Caught: {percentageCaught}%</p>
            <p>Pokémon Remaining to Catch: {remainingPokemon}</p>

        </Container>
    );
}