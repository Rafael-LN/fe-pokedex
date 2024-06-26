import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./components/PokemonDetail";
import {Pokedex} from "./pages/Pokedex";
import {Gallery} from "./pages/Gallery";
import {MyProgress} from "./pages/MyProgress";
import {NavBarComponent} from "./components/NavBarComponent"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/pokemon/:name",
        element: <PokemonDetail/>
    },
    {
        path: "/gallery",
        element: <Gallery/>
    },
    {
        path: "/pokedex",
        element: <Pokedex/>,
    },
    {
        path: "/pokedex/my-progress",
        element: <MyProgress/>
    }
])

export function App() {
    return (
        <>
            <NavBarComponent />
            <RouterProvider router={router}></RouterProvider>
        </>
)
}
