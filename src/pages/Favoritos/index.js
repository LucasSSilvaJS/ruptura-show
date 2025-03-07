import { FaHeartCircleMinus } from "react-icons/fa6";
import Navbar from "../../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Favoritos() {

    const navigate = useNavigate()

    const {getLoginInLocalStorage, removerFavoritos} = useContext(AuthContext)
    const [epFavoritos, setEpFavoritos] = useState([])

    async function removerEpisodio(dado) {
        const foiRemovido = await removerFavoritos(dado)
        if(foiRemovido){
            toast.success('Episodio removido com sucesso')
            navigate(0)
        }else{
            toast.warn('Ocorreu um erro inesperado')
        }
    }

    useEffect(() => {
        async function buscarEpisodios() {
            const userInfo = getLoginInLocalStorage()
            if (userInfo) {
                try {
                    const episodios = await Promise.all(userInfo.favoritos.map(async (imdbId) => {
                        const response = await axios.get('https://www.omdbapi.com/', {
                            params: {
                                apikey: 'e5f5f039',
                                i: imdbId
                            }
                        });
    
                        const data = response.data;
                        return {
                            imdbID: data.imdbID,
                            Title: data.Title,
                            Season: data.Season,
                            Episode: data.Episode
                        };
                    }));
    
                    setEpFavoritos(episodios);
                } catch (error) {
                    console.error("Erro ao buscar episódios:", error);
                }
            }
        }
    
        buscarEpisodios();
    }, [])

    return (
        <div 
            className="min-h-dvh bg-primaria text-secundaria"
            style={{marginBottom: '78px'}}
        >
            <main>
                <section>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-titulo font-bold text-2xl pt-4 ps-4 mb-4">
                            Favoritos
                        </h2>
                        <div className="overflow-y-hidden">
                            {epFavoritos.length > 0 && epFavoritos.map(ep => (
                                <article  className="bg-slate-400 w-3/4 mx-auto mb-4 rounded p-4 flex justify-between items-center" key={ep.imdbID}>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-600 mb-2">{ep.Title}</h3>
                                        <p className="font-semibold text-sm bg-red-600 p-1 rounded">{`Temporada ${ep.Season} | Episódio ${ep.Episode}`}</p>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => removerEpisodio(ep.imdbID)}
                                        >
                                            <FaHeartCircleMinus size={30} className="text-secundaria"/> 
                                        </button>
                                    </div>
                                </article>
                            ))}
                            {epFavoritos.length === 0 && <p className="text-center">Nenhum episódio adicionado 😢</p>}
                        </div>
                    </div>
                </section>
            </main>
            <Navbar/>
        </div>
    );
}

export default Favoritos;