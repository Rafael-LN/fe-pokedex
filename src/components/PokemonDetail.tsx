import {useParams} from "react-router-dom";
import PokemonStats from "./PokemonStats";
import {
    Alert,
    Button,
    Card, CardBody, CardFooter,
    CardImg, CardTitle,
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
import {BackButton} from "./BackButton";
import {ReactComponent as EmptyPokeBall} from "../assets/iconoir--pokeball.svg";
import {ReactComponent as PokeBallFull} from "../assets/pokeball-full.svg";

export default function PokemonDetail() {
    const {name} = useParams();
    const {pokemons, updatePokemonDetails, isPokedex} = usePokemonContext();

    const pokemon = pokemons.find((pokemon) => pokemon.name === name);

    const [showPopup, setShowPopup] = useState(false);
    const [note, setNote] = useState(pokemon?.note);


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

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('URL copied to clipboard');
        } catch (error) {
            console.error('Failed to copy URL to clipboard:', error);
            alert('Failed to copy URL to clipboard');
        }
    };

    return (
        <>
            {showPopup && (
                <Alert variant="success" onClose={() => setShowPopup(false)} dismissible>
                    <p>Pokémon successfully marked as caught!</p>
                </Alert>

            )}
            <Container fluid className="p-3" style={{backgroundColor: `${pokemon?.color}`}}>
                <div className={`d-flex justify-content-center`}>
                    <h1 className={` display-1 text-capitalize`}>{pokemon?.name}</h1>
                </div>
                <div className={`d-flex align-items-start my-3`}>
                    <BackButton margin={`me-4`}/>

                    <Button onClick={handleShare}>
                        Share Pokémon
                    </Button>
                </div>
                <div className={`my-3`}>
                    {!pokemon?.caught ?
                        <EmptyPokeBall
                            style={{width: '2.5rem', height: '2.5rem'}}
                            onClick={handleMarkAsCaughtAndShowPopup}
                        >
                            <Button onClick={handleMarkAsCaughtAndShowPopup} disabled={pokemon?.caught}>
                            </Button>
                        </EmptyPokeBall>
                        : <PokeBallFull style={{width: '2.5rem', height: '2.5rem'}}/>
                    }
                </div>

                <Row>
                    <Col lg={pokemon?.caught ? 2 : 4} md={4}>
                        <Card key={`${pokemon?.name}-${pokemon?.id}`} className={`mb-4 w-auto`}>
                            <CardImg
                                variant="top"
                                src={pokemon?.sprites.other["official-artwork"].front_default}
                                alt={name}
                            />
                        </Card>
                    </Col>
                    <Col lg={pokemon?.caught ? 4 : 8} md={8}>
                        {pokemon && <PokemonInfo pokemon={pokemon} isPokedex={isPokedex}/>}
                    </Col>
                    {
                        pokemon?.caught &&
                        <Col lg={6}>
                            <Card className={`text-center h-auto`}>
                                <CardTitle>
                                    <h3>Quick Note</h3>
                                </CardTitle>
                                <CardBody>
                                    <FormGroup controlId="noteTextArea">
                                        <FormControl as="textarea" value={note} onChange={handleNoteChange}/>
                                    </FormGroup>
                                </CardBody>
                                <CardFooter>
                                    <Button onClick={handleSaveNote}>Save Note</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    }
                </Row>
                <Row>
                    <Col>
                        {pokemon?.stats && <PokemonStats stats={pokemon?.stats}/>}
                    </Col>
                </Row>
            </Container>


        </>
    )
}