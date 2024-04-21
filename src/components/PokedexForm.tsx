import {Button, Col, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useSearchContext} from "../context/SearchContext";
import {POKEMON_API_TYPE_URL} from "../constants";
import {type PokemonComponent} from "../models";

export function PokedexForm() {
    const {
        nameFilter,
        heightFilter,
        typeFilter,
        timestampFilter,
        setNameFilter,
        setHeightFilter,
        setTypeFilter,
        setTimestampFilter,
    } = useSearchContext();

    const [pokemonTypes, setPokemonTypes] = useState<PokemonComponent[]>([]);

    useEffect(() => {
        const fetchPokemonTypes = async () => {
            try {
                const response = await fetch(POKEMON_API_TYPE_URL);
                if (response.ok) {
                    const data = await response.json();
                    setPokemonTypes(data.results);
                } else {
                    console.error('Failed to fetch Pokemon types');
                }
            } catch (error) {
                console.error('Error fetching Pokemon types:', error);
            }
        };

        fetchPokemonTypes();
    }, []);

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

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // Perform search or filtering logic here
    };

    return (
        <Form onSubmit={handleSubmit}>
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

            <Button variant="primary" type="submit">
                Apply Filters
            </Button>
        </Form>
    );
}