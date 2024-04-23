import {PokemonStat} from "../models";
import {Card, CardBody, ProgressBar} from "react-bootstrap";
import {Fragment} from "react";

interface PokemonStatsProps {
    stats: PokemonStat[]
}

export default function PokemonStats({stats}: PokemonStatsProps) {

    return (
        <Card>
            <CardBody>
                {stats.map((stat) => (
                    <Fragment key={stat.stat.name}>
                        <div className="d-flex mb-2">
                            <span className="text-capitalize fw-semibold">{stat.stat.name}</span>
                            <span className="mx-3">{stat.base_stat}</span>
                        </div>
                        <ProgressBar className="mb-2" now={stat.base_stat} max={255}/>
                    </Fragment>
                ))}
            </CardBody>
        </Card>
    );
}