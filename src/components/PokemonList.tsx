import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import PokemonCard from './PokemonCard';
import { usePokemonContext } from '../context/PokemonsContext';
import {PokemonDetails} from "../models";

export default function PokemonList() {
    const { pokemons, hasMorePokemon, fetchNextPage, isPokedex, pokemonTypes, setCaughtState } = usePokemonContext();

    const [nameFilter, setNameFilter] = useState<string>('');
    const [heightFilter, setHeightFilter] = useState<string>('');
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [timestampFilter, setTimestampFilter] = useState<Date>();
    const [selectedPokemons, setSelectedPokemons] = useState<PokemonDetails[]>([]);

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
        selectedPokemons.forEach((pokemon) => setCaughtState(pokemon.name, false))
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
                if (timestampFilter && pokemon.caughtDate && pokemon.caughtDate.toString() < timestampFilter.toISOString()) {
                    return false;
                }
                return true;
            }
            return false;
        })
        : pokemons;

    return (
        <>
            <h2>Pokémon List</h2>

            {isPokedex && (
                <Form>
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
                                type="date"
                                value={timestampFilter?.toISOString().split('T')[0]}
                                onChange={handleTimestampChange}
                                placeholder="Select date"
                            />
                        </Form.Group>
                    </Row>
                </Form>
            )}

            <div className="d-flex flex-wrap justify-content-between">
                {filteredPokemons?.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name}
                        pokemon={pokemon}
                        isPokedex={isPokedex}
                        onToggleCatch={handleToggleCatch}
                    />
                ))}
            </div>

            {selectedPokemons.length > 0 && (
                <Button variant="danger" onClick={handleDeleteSelected}>
                    Delete Selected Pokémon
                </Button>
            )}

            {hasMorePokemon && <Button className="btn btn-primary" onClick={fetchNextPage}>Load more</Button>}
        </>
    );
}
