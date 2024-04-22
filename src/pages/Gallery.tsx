import {PokemonListContainer} from "../containers/ListContainer";
import {usePokemonContext} from "../context/PokemonsContext";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useEffect} from "react";
import PokemonList from "../components/PokemonList";

export function Gallery() {
    const navigate = useNavigate();
    const {setIsPokedex} = usePokemonContext();

    useEffect(() => {
        setIsPokedex(false);
    }, [])

    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            <Button onClick={goBack}>
                Go Back
            </Button>
            <div className="container text-center">
                <PokemonList/>
            </div>
        </>
    );
}