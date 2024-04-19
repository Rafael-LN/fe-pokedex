import {PokemonDetails, PokemonType} from "../models";
import {Card, Col, Row} from "react-bootstrap";
import {POKEBALL_IMAGE_URL} from "../constants";
import {capitalize} from "../utils";

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
                        <Card.Text> Height: {pokemon.height} </Card.Text>
                        <Card.Text> Weight: {pokemon.weight} </Card.Text>
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