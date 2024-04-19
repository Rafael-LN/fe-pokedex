import {PokemonStat} from "../models";
import {Card, Col, ListGroup, ProgressBar, Row} from "react-bootstrap";

interface PokemonStatsProps {
    stats: PokemonStat[]
}

export default function PokemonStats({stats}: PokemonStatsProps) {

    return (
        <Card className="w-75">
            <Card.Body>
                {stats.map((stat) => (

                    <ListGroup.Item className="d-flex justify-content-end align-items-center">
                        <span key={stat.stat.name}
                                   className="text-capitalize fw-semibold">{stat.stat.name}</span>
                        <div className="ms-3 vr"></div>
                        <span className="mx-3">{stat.base_stat}</span>
                        <ProgressBar className="w-75 " now={stat.base_stat} max={255}/>
                    </ListGroup.Item>

                ))}
            </Card.Body>
        </Card>
    );
}