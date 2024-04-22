import React, {useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import PokemonCard from "./PokemonCard";
import {usePokemonContext} from "../context/PokemonsContext";


export default function PokemonList() {
    const {pokemons, hasMorePokemon, fetchNextPage, isPokedex, pokemonTypes} = usePokemonContext();

    const [nameFilter, setNameFilter] = useState<string>('');
    const [heightFilter, setHeightFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [timestampFilter, setTimestampFilter] = useState<Date>();

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

    const filteredPokemons = isPokedex ? pokemons.filter((pokemon) => {
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

            if (timestampFilter && pokemon.caughtDate && pokemon.caughtDate.toString() < timestampFilter.toISOString()) {
                return false;
            }
            return true;
        }
        return false;
    }) : pokemons;

    return (
        <>
            <h2>Pokémon List</h2>

            {isPokedex && <Form>
                <Row>
                    <Form.Group as={Col} controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={nameFilter}
                            onChange={handleNameChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formHeight">
                        <Form.Label>Height</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter height"
                            name="height"
                            value={heightFilter}
                            onChange={handleHeightChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formType">
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
                    <Form.Group as={Col} controlId="formTimestamp">
                        <Form.Label>Timestamp</Form.Label>
                        <Form.Control
                            type="date" // Use date type for selecting only the date
                            value={timestampFilter?.toISOString().split('T')[0]} // Convert date to ISO string format and remove time part
                            onChange={handleTimestampChange}
                            placeholder="Select date"
                        />
                    </Form.Group>
                </Row>
            </Form>}

            <div className="d-flex flex-wrap justify-content-between">
                {filteredPokemons?.map((pokemon) => (
                    <PokemonCard key={pokemon.name} pokemon={pokemon}/>
                ))}
            </div>

            {hasMorePokemon && <button className="btn btn-primary" onClick={fetchNextPage}>Load more</button>}
        </>
    );
};

