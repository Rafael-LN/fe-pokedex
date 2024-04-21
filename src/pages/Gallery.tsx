import {PokemonListContainer} from "../containers/ListContainer";

export function Gallery() {
    return (
        <>
            <div className="container text-center">
                <h1>Welcome to the Pokémon App</h1>
                <PokemonListContainer/>
            </div>
        </>
    );
}