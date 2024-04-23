import {useNavigate, useParams} from "react-router-dom";
import PokemonStats from "./PokemonStats";
import {Alert, Button, Card, CardImg, CardText, Col, Container, Row} from "react-bootstrap";
import {PokemonInfo} from "./PokemonInfo";
import {useState} from "react";
import {usePokemonContext} from "../context/PokemonsContext";

export default function PokemonDetail() {
    const navigate = useNavigate();
    const {name} = useParams();
    const {pokemons, setCaughtState, isPokedex} = usePokemonContext();

    const [showPopup, setShowPopup] = useState(false);

    const pokemon = pokemons.find((pokemon) => pokemon.name === name)


    const goBack = () => {
        navigate(-1);
    }

    const handleMarkAsCaughtAndShowPopup = () => {
        setCaughtState(pokemon?.name, true);
        setShowPopup(true);
    };

    return (
        <>
            <Container fluid className="p-5" style={{backgroundColor: `${pokemon?.color}`}}>
                <Button onClick={goBack}>
                    Go Back
                </Button>
                <Row>
                    <Col lg={2} md={4}>
                        <Card key={`${pokemon?.name}-${pokemon?.id}`} className="mb-4" style={{width: "15rem"}}>
                            <CardImg variant="top"
                                     src={pokemon?.sprites.other["official-artwork"].front_default}
                                     alt={name}/>
                        </Card>
                        <Button onClick={handleMarkAsCaughtAndShowPopup} disabled={pokemon?.caught}>
                            Mark as Caught
                        </Button>
                    </Col>
                    <Col lg={10} md={8}>
                        {pokemon && <PokemonInfo pokemon={pokemon} isPokedex={isPokedex}/>}
                    </Col>
                </Row>
                {pokemon?.stats && <PokemonStats stats={pokemon?.stats}/>}

            </Container>


            {showPopup && (
                <Alert variant="success" onClose={() => setShowPopup(false)} dismissible>
                    <p>Pokémon successfully marked as caught!</p>
                </Alert>

            )}
        </>
    )
}