import {PokemonStat} from "../models";
import {Card, ProgressBar} from "react-bootstrap";

interface PokemonStatsProps {
    stats: PokemonStat[]
}

export default function PokemonStats({stats}: PokemonStatsProps) {

    return (
        <Card className="w-50">
            <Card.Body >
                {stats.map((stat) => (
                    <>
                    <div className="d-flex mb-2">
                        <span key={stat.stat.name}
                                   className="text-capitalize fw-semibold">{stat.stat.name}</span>
                        <span className="mx-3">{stat.base_stat}</span>
                    </div>
                        <ProgressBar className="mb-2"  now={stat.base_stat} max={255}/>
                    </>
                ))}
            </Card.Body>
        </Card>
    );
}