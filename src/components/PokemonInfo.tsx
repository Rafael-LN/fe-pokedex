import {PokemonDetails, PokemonType} from "../models";
import {Card, CardBody, CardText, CardTitle, Col, Row} from "react-bootstrap";
import {capitalize, convert} from "../utils";

interface PokemonInfoProps {
    pokemon: PokemonDetails
    isPokedex?: boolean
}

export function PokemonInfo({pokemon, isPokedex}: PokemonInfoProps) {
    return (
        <Card>
            <CardBody>
                <CardTitle className="text-capitalize">
                    {pokemon.name}
                </CardTitle>
                <Row>
                    <Col>
                        <CardText>
                            Height: {convert(pokemon.height, 0.1)} m
                        </CardText>
                        <Card.Text>
                            Weight: {convert(pokemon.weight, 0.1)} Kg
                        </Card.Text>
                    </Col>
                    <Col>
                        {pokemon.types.map(({type}: PokemonType) =>
                            <CardText key={type.name}>
                                Type: {capitalize(type.name)}
                            </CardText>
                        )}
                    </Col>
                </Row>
                <Row>
                    {
                        isPokedex && pokemon?.caughtDate &&
                        <CardText>
                            Captured: {new Date(pokemon.caughtDate).toLocaleDateString()}
                        </CardText>
                    }
                </Row>
            </CardBody>
        </Card>
    );
}