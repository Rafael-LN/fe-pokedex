import React, {useEffect, useState} from "react";
import {Card, CardBody, CardText, Container} from "react-bootstrap";
import {usePokemonContext} from "../context/PokemonsContext";
import {BackButton} from "../components/BackButton";

export function MyProgress() {
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

    return (
        <Container className={`text-center`}>
            <div className={`d-flex align-items-start mt-3`}>
                <BackButton/>
            </div>

            <h2 className={`display-1`}>Pokédex Progress</h2>

            <Card className={`text-start w-25`} >
                <CardBody>
                    <CardText>Total Pokémon Caught: {totalCaughtPokemon}</CardText>
                    <CardText>Percentage Caught: {percentageCaught}%</CardText>
                    <CardText>Pokémon Remaining to Catch: {remainingPokemon}</CardText>
                </CardBody>
            </Card>

        </Container>
    );
}