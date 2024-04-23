import {Button} from "react-bootstrap";
import {PokemonDetails} from "../models";

type ExportCSVButtonProps = {
    pokemons: PokemonDetails[],
    margin?: string
}

export function ExportCSVButton({pokemons, margin}: ExportCSVButtonProps) {

    function convertToCSV(pokemons: PokemonDetails[]): string {
        const header = "id,name,type,height,base_stat,caughtDate,note\n";
        const rows = pokemons.map((pokemon) => {
            const types = pokemon.types.map((type) => type.type.name).join("|");
            const stats = pokemon.stats.map((stat) => stat.base_stat).join("|");
            const caughtDate = pokemon.caughtDate ? pokemon.caughtDate.toString() : "";
            return `${pokemon.id},${pokemon.name},${types},${pokemon.height},${stats},${caughtDate},${pokemon.note || ""}`;
        }).join("\n");
        return header + rows;
    }


    function exportToCSV(pokemons: PokemonDetails[]) {
        const csv = convertToCSV(pokemons);
        const csvBlob = new Blob([csv], {type: "text/csv"});
        const url = window.URL.createObjectURL(csvBlob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "pokemon_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleExport = () => {
        exportToCSV(pokemons);
    };

    return (
        <Button variant={`success`} onClick={handleExport} className={`${margin}`}>
            Export to CSV
        </Button>
    );
}