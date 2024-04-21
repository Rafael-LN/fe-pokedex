import {useNavigate, useParams} from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import PokemonStats from "./PokemonStats";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {PokemonInfo} from "./PokemonInfo";

export default function PokemonDetail() {
    const navigate = useNavigate();
    const {name} = useParams();
    const {pokemon, isLoading, handleMarkAsCaught} = usePokemon(name);

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            {
                isLoading ?
                    (
                        <div>Loading...</div>
                    )
                    :
                    (
                        <Container fluid className="p-5" style={{backgroundColor: `${pokemon?.color}`}}>
                            <Button onClick={goBack}>
                                Go Back
                            </Button>
                            <Row>
                                <Col lg={2} md={4}>
                                    <Card key={`${pokemon?.name}-${pokemon?.id}`} className="mb-4" style={{width: "15rem"}}>
                                        <Card.Img variant="top"
                                                  src={pokemon?.sprites.other["official-artwork"].front_default}
                                                  alt={name}/>
                                    </Card>
                                    <Button onClick={handleMarkAsCaught} disabled={pokemon?.caught}>
                                        Mark as Caught
                                    </Button>
                                </Col>
                                <Col lg={10} md={8}>
                                    {pokemon && <PokemonInfo pokemon={pokemon}/>}
                                </Col>
                            </Row>
                            {pokemon?.stats && <PokemonStats stats={pokemon?.stats}/>}
                        </Container>
                    )
            }
        </>
    )
}