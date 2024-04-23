import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

interface BackButtonProps {
    margin?: string
}

export function BackButton({margin}: BackButtonProps) {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigate back one step in history
    };

    return (
        <Button onClick={goBack} variant={`outline-secondary`} className={`${margin ?? ''}`}>
            &#8592; Back
        </Button>
    );
}