import {usePokemonContext} from "../context/PokemonsContext";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import PokemonList from "../components/PokemonList";

export function Pokedex() {
    const navigate = useNavigate();
    const {setIsPokedex} = usePokemonContext();

    useEffect(() => {
        setIsPokedex(true);
    }, []);

    const goBack = () => {
        navigate(-1);
    }
    return (
        <>
            <Button onClick={goBack}>
                Go Back
            </Button>
            <PokemonList/>
        </>
    );
}