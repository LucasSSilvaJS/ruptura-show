import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import Calendario from "../pages/Calendario";
import Episodio from "../pages/Episodio";
import Resumo from "../pages/Resumo";
import Teorias from "../pages/Teorias";
import Favoritos from "../pages/Favoritos";
import Private from './Private'
import Public from './Public'

function RoutesApp() {
    return ( 
        <Routes>
            <Route path="/" element={<Public><Login/></Public>}/>
            <Route path="/cadastro" element={<Public><Cadastro/></Public>}/>
            <Route path="/home" element={<Private><Home/></Private>}/>
            <Route path="/calendario" element={<Private><Calendario/></Private>}/>
            <Route path="/episodios/:id" element={<Private><Episodio/></Private>}/>
            <Route path="/resumo/:titulo" element={<Private><Resumo/></Private>}/>
            <Route path="/teorias/:titulo" element={<Private><Teorias/></Private>}/>
            <Route path="/favoritos" element={<Private><Favoritos/></Private>}/>
        </Routes>
     );
}

export default RoutesApp;