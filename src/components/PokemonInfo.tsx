import {PokemonDetails, PokemonType} from "../models";
import {Card, CardBody, CardText, CardTitle, Col, Row} from "react-bootstrap";
import {capitalize, convert} from "../utils";

interface PokemonInfoProps {
    pokemon: PokemonDetails
    isPokedex?: boolean
}

export function PokemonInfo({pokemon, isPokedex}: PokemonInfoProps) {
    return (
        <Card className={`text-center`}>
            <CardTitle className="text-capitalize display-5">About</CardTitle>
            <CardBody>
                <Row>
                    <Col>
                        <CardText>
                            <strong>Height:</strong> {convert(pokemon.height, 0.1)} m
                        </CardText>
                        <Card.Text>
                            <strong>Weight:</strong> {convert(pokemon.weight, 0.1)} Kg
                        </Card.Text>
                    </Col>
                    <Col>
                        {pokemon.types.map(({type}: PokemonType) =>
                            <CardText key={type.name}>
                                <strong>Type:</strong> {capitalize(type.name)}
                            </CardText>
                        )}
                    </Col>
                </Row>
                <Row>
                    {
                       pokemon?.caughtDate &&
                        <CardText className={`mt-4`}>
                            <strong>Captured:</strong> {new Date(pokemon.caughtDate).toLocaleDateString()}
                        </CardText>
                    }
                </Row>
            </CardBody>
        </Card>
    );
}