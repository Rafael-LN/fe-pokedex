import {PokemonDetails} from "../models";
import {Card} from "react-bootstrap";

interface PokemonInfoProps {
    pokemon: PokemonDetails
}

export function PokemonInfo({pokemon}: PokemonInfoProps) {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-capitalize">{pokemon.name}</Card.Title>
                <Card.Text>Height: {pokemon.height}</Card.Text>
                <Card.Text>Weight: {pokemon.weight}</Card.Text>
            </Card.Body>
        </Card>
    );
}