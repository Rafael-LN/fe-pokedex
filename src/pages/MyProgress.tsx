import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {usePokemonContext} from "../context/PokemonsContext";

export function MyProgress() {
    const navigate = useNavigate();
    const { pokemons } = usePokemonContext();

    // Calculate progress statistics
    const totalCaughtPokemon = pokemons.filter((pokemon) => pokemon.caught).length;
    const totalPokemonAvailable = pokemons.length;
    const percentageCaught = ((totalCaughtPokemon / totalPokemonAvailable) * 100).toFixed(2);
    const remainingPokemon = totalPokemonAvailable - totalCaughtPokemon;

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