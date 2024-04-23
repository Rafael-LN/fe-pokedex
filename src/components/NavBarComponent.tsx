import {Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink, Container} from "react-bootstrap";
import {usePokemonContext} from "../context/PokemonsContext";

export function NavBarComponent() {
    const {isPokedex} = usePokemonContext();
    return (
        <Navbar sticky={`top`} expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <NavbarBrand href="/">Pokémon App</NavbarBrand>
                <NavbarToggle aria-controls="basic-navbar-nav"/>
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink href={`/gallery`}>Gallery</NavLink>
                        <NavLink href={`/pokedex`}>Pokedex</NavLink>
                        {isPokedex && <NavLink href={`/pokedex/my-progress`}>My Progress</NavLink>}
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    );
}