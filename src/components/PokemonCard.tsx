import {PokemonDetails, PokemonListData} from "../models";
import {POKEBALL_IMAGE_URL} from "../constants";
import {Link} from "react-router-dom";

type PokemonCardProps = {
    pokemon: PokemonDetails;
}

export default function PokemonCard({pokemon}: PokemonCardProps) {
    const {id, name, sprites, caught} = pokemon;
    return (
        <Link to={`/pokemon/${pokemon.name}`} className="text-decoration-none">
            <div key={`${name}-${id}`} className="card mb-4" style={{width: "15rem"}}>
                <img className="card-img-top " src={sprites.other["official-artwork"].front_default} alt={name}/>
                <div className="card-body">
                    <span className="text-capitalize">{name}</span> {caught && <img
                    src={POKEBALL_IMAGE_URL}
                    alt={"poke-ball"}/>}
                </div>
            </div>
        </Link>
    )
}