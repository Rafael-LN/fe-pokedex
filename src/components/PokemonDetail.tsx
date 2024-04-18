import {useParams} from "react-router-dom";
import usePokemon from "../hooks/usePokemon";

export default function PokemonDetail() {

    const {name} = useParams();

    const {pokemon, isLoading} = usePokemon({name});

    console.log(pokemon)
    return (
        <>
            {
                isLoading ?
                    (
                        <div>Loading...</div>
                    )
                    :
                    (
                        <div className="container" style={{backgroundColor: `${pokemon?.color}`}}>
                            <div key={`${pokemon?.name}-${pokemon?.id}`} className="card mb-4" style={{width: "15rem"}}>
                                <img className="card-img-top "
                                     src={pokemon?.sprites.other["official-artwork"].front_default}
                                     alt={name}/>
                                <div className="card-body">
                                    <span className="text-capitalize">{pokemon?.name}</span>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}