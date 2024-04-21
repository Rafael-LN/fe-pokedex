import {PokemonListData} from "../models";
import {POKEBALL_IMAGE_URL} from "../constants";
import {Link} from "react-router-dom";

type PokemonCardProps = {
    pokemon: PokemonListData;
}

export default function PokemonCard({pokemon}: PokemonCardProps) {
    const {name, url, caught, image, pokedexNumber} = pokemon;
    return (
        <Link to={`pokemon/${pokemon.name}`} className="text-decoration-none">
            <div key={`${name}-${pokedexNumber}`} className="card mb-4" style={{width: "15rem"}}>
                <img className="card-img-top " src={image} alt={name}/>
                <div className="card-body">
                    <span className="text-capitalize">{name}</span> {caught && <img
                    src={POKEBALL_IMAGE_URL}
                    alt={"poke-ball"}/>}
                </div>
            </div>
        </Link>
    )
}