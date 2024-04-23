import React, {useState} from 'react';
import {Col, Form, Row, Button} from 'react-bootstrap';
import PokemonCard from './PokemonCard';
import {usePokemonContext} from '../context/PokemonsContext';
import {PokemonDetails} from "../models";
import {ExportCSVButton} from "./ExportCSVButton";
import {BackButton} from "./BackButton";

type PokemonListProps = {
    title?: string
}

export default function PokemonList({title}: PokemonListProps) {
    const {
        pokemons,
        hasMorePokemon,
        fetchNextPage,
        isPokedex,
        pokemonTypes,
        updatePokemonDetails
    } = usePokemonContext();

    const [nameFilter, setNameFilter] = useState<string>('');
    const [heightFilter, setHeightFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [timestampFilter, setTimestampFilter] = useState<Date>();
    const [selectedPokemons, setSelectedPokemons] = useState<PokemonDetails[]>([]);
    const formColMdValue = '6';


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value);
    };

    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeightFilter(event.target.value);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(event.target.value);
    };

    const handleTimestampChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimestampFilter(new Date(event.target.value));
    };

    const handleToggleCatch = (pokemon: PokemonDetails, isChecked: boolean) => {
        if (isChecked) {
            setSelectedPokemons((prevSelected) => [...prevSelected, pokemon]);
        } else {
            setSelectedPokemons((prevSelected) => prevSelected.filter((p) => p.id !== pokemon.id));
        }
    };

    const handleDeleteSelected = () => {
        selectedPokemons.forEach((pokemon) => updatePokemonDetails(pokemon.name, false))
        setSelectedPokemons([]);
    };

    const filteredPokemons = isPokedex
        ? pokemons.filter((pokemon) => {
            if (pokemon.caught) {
                if (nameFilter && !pokemon.name.toLowerCase().includes(nameFilter.toLowerCase())) {
                    return false;
                }
                if (typeFilter && !pokemon.types.some((type) => type.type.name.toLowerCase() === typeFilter)) {
                    return false;
                }
                if (heightFilter && (pokemon.height < +heightFilter || pokemon.height > +heightFilter)) {
                    return false;
                }
                return !(timestampFilter && pokemon.caughtDate && pokemon.caughtDate.toString() < timestampFilter.toISOString());

            }
            return false;
        })
        : pokemons;

    console.log(filteredPokemons)

    return (
        <>
            {title &&
                <div className={`d-flex align-items-start mt-3`}>
                    <BackButton/>
                </div>
            }

            <h1 className={`display-2 mb-5 mt-4`}>{title}</h1>

            <Row>
                <Col>
                    {selectedPokemons.length > 0 && (
                        <Button variant="danger" onClick={handleDeleteSelected} className={`ms-3`}>
                            Delete Selected Pokémon
                        </Button>
                    )}

                    {isPokedex && <ExportCSVButton pokemons={filteredPokemons} margin={`ms-3`}/>}
                </Col>
            </Row>

            {isPokedex && (

                <Form>
                    <Row>
                        <Form.Group as={Col} controlId="formName" className={`text-start my-2`} md={formColMdValue}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={nameFilter}
                                onChange={handleNameChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formHeight" className={`text-start my-2`} md={formColMdValue}>
                            <Form.Label>Height</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter height"
                                name="height"
                                value={heightFilter}
                                onChange={handleHeightChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formType" className={`text-start my-2`} md={formColMdValue}>
                            <Form.Label>Type</Form.Label>
                            <Form.Select className="text-capitalize" value={typeFilter} onChange={handleTypeChange}>
                                <option value="">Select type</option>
                                {pokemonTypes.map((type) => (
                                    <option className="text-capitalize" key={type.name} value={type.name}>
                                        {type.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formTimestamp" className={`text-start my-2`}
                                    md={formColMdValue}>
                            <Form.Label>Timestamp</Form.Label>
                            <Form.Control
                                type="date"
                                value={timestampFilter?.toISOString().split('T')[0]}
                                onChange={handleTimestampChange}
                                placeholder="Select date"
                            />
                        </Form.Group>
                    </Row>
                </Form>
            )}

            <Row className={`justify-content-center mt-4`}>
                {filteredPokemons?.map((pokemon) => (
                    <Col lg={`3`} md={`4`} sm={`5`} xs={`6`}>
                        <PokemonCard
                            key={pokemon.name}
                            pokemon={pokemon}
                            isPokedex={isPokedex}
                            onToggleCatch={handleToggleCatch}
                        />
                    </Col>
                ))}
            </Row>

            {!isPokedex && hasMorePokemon &&
                <Button className={`mb-4`} variant={`secondary`} onClick={fetchNextPage}>Load more</Button>}
        </>
    );
}
