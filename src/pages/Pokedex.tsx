import {usePokemonContext} from "../context/PokemonsContext";
import {Button, Container} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
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
        <Container>
            <Button onClick={goBack}>
                Go Back
            </Button>
            <Link to={`/pokedex/my-progress`}>
                <Button variant="info">My Progress</Button>
            </Link>
            <PokemonList/>
        </Container>
    );
}