import {PokemonDetails} from "../models";
import {POKEBALL_IMAGE_URL} from "../constants";
import {Link} from "react-router-dom";
import {Card, CardBody, CardImg, CardText, Form, FormCheck} from "react-bootstrap";
import {useState} from "react";

type PokemonCardProps = {
    pokemon: PokemonDetails;
    isPokedex?: boolean;
    onToggleCatch?: (pokemon: PokemonDetails, isChecked: boolean) => void;
}

export default function PokemonCard({pokemon, isPokedex, onToggleCatch}: PokemonCardProps) {
    const {id, name, sprites, caught} = pokemon;
    const [isSelected, setIsSelected] = useState(false);

    const handleCheckboxChange = () => {
        setIsSelected(!isSelected);
        if (onToggleCatch) {
            onToggleCatch(pokemon, !isSelected);
        }
    };

    return (
        <Card key={`${name}-${id}`} className={`text-center bg-dark-subtle mb-4 px-4 py-2 w-auto`}>
            {isPokedex &&
                <Form>
                    <FormCheck
                        className={`align-self-end p-2`}
                        id={`${id}`}
                        onChange={handleCheckboxChange}
                        checked={isSelected}
                        isInvalid
                    />
                </Form>
            }
            <Link to={`/pokemon/${pokemon.name}`} className={`text-decoration-none`}>
                <CardImg variant="top" src={sprites.other["official-artwork"].front_default} alt={name} />
                <CardBody>
                    <CardText className={`text-capitalize text-truncate text-black`}>
                        {name} {caught && <img src={POKEBALL_IMAGE_URL} alt={"poke-ball"}/>}
                    </CardText>
                </CardBody>
            </Link>
        </Card>
    )
}