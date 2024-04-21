import {PokemonDetails, PokemonType} from "../models";
import {Card, Col, Row} from "react-bootstrap";
import {capitalize, convert} from "../utils";

interface PokemonInfoProps {
    pokemon: PokemonDetails
}

export function PokemonInfo({pokemon}: PokemonInfoProps) {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-capitalize">{pokemon.name}</Card.Title>
                <Row>
                    <Col>
                        <Card.Text> Height: {convert(pokemon.height, 0.1)} m</Card.Text>
                        <Card.Text> Weight: {convert(pokemon.weight, 0.1)} Kg </Card.Text>
                    </Col>
                    <Col>
                        {pokemon.types.map(({type}: PokemonType) =>
                            <Card.Text key={type.name}>Type: {capitalize(type.name)}</Card.Text>
                        )}
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    );
}