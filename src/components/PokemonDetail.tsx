import {useNavigate, useParams} from "react-router-dom";
import PokemonStats from "./PokemonStats";
import {
    Alert,
    Button,
    Card,
    CardImg,
    Col,
    Container,
    FormControl,
    FormGroup,
    FormLabel,
    Row
} from "react-bootstrap";
import {PokemonInfo} from "./PokemonInfo";
import React, {useState} from "react";
import {usePokemonContext} from "../context/PokemonsContext";

export default function PokemonDetail() {
    const navigate = useNavigate();
    const {name} = useParams();
    const {pokemons, updatePokemonDetails, isPokedex} = usePokemonContext();

    const pokemon = pokemons.find((pokemon) => pokemon.name === name);

    const [showPopup, setShowPopup] = useState(false);
    const [note, setNote] = useState(pokemon?.note);



    const goBack = () => {
        navigate(-1);
    }

    const handleMarkAsCaughtAndShowPopup = () => {
        updatePokemonDetails(pokemon?.name, true);
        setShowPopup(true);
    };

    const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value);
    };

    const handleSaveNote = () => {
        updatePokemonDetails(pokemon?.name, pokemon?.caught || false, note);
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
                <Row>
                    <Col lg={6}>
                        {pokemon?.stats && <PokemonStats stats={pokemon?.stats}/>}
                    </Col>
                    <Col lg={6}>
                        {
                            isPokedex &&
                            <FormGroup controlId="noteTextArea">
                                <FormLabel>Add a Note:</FormLabel>
                                <FormControl as="textarea" value={note} onChange={handleNoteChange}/>
                                <Button onClick={handleSaveNote}>Save Note</Button>
                            </FormGroup>
                        }
                    </Col>
                </Row>
            </Container>


            {showPopup && (
                <Alert variant="success" onClose={() => setShowPopup(false)} dismissible>
                    <p>Pokémon successfully marked as caught!</p>
                </Alert>

            )}
        </>
    )
}