import {PokemonList} from "../models";
import {POKEBALL_IMAGE_URL} from "../constants";

type PokemonCardProps = {
    pokemon: PokemonList;
}

export default function PokemonCard({pokemon}: PokemonCardProps) {
    const {name, url, caught, image, pokedexNumber} = pokemon;
    return (
        <div key={`${name}-${pokedexNumber}`} className="card mb-4" style={{width:"15rem"}}>
            <img className="card-img-top " src={image} alt={name}/>
            <div className="card-body">
                <span className="text-capitalize">{name}</span> {caught && <img
                src={POKEBALL_IMAGE_URL}
                alt={"poke-ball"}/>}
            </div>

        </div>
    )
}