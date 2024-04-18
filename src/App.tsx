import React from 'react';
import './App.scss';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./components/PokemonDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "pokemon/:name",
        element: <PokemonDetail/>
    }
])

export function App() {
  return <RouterProvider router={router}/>
}
