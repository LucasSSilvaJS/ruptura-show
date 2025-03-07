import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";

function Episodio() {

    const navigate = useNavigate()
    const [episodio, setEpisodio] = useState({})
    const { id } = useParams()
    const {adicionarEmFavoritos, user} = useContext(AuthContext)

    async function favoritarEP(){
        if (user.favoritos.some((fav) => fav === id)) {
            toast.warn("Este episódio já está nos favoritos!");
            return;
        }
        const foiAceito = await adicionarEmFavoritos(id)
        if(foiAceito){
            toast.success('Episódio adicionado com sucesso')
        }else{
            toast.warn('Ocorreu um erro inesperado')
        }
    }

    useEffect(() => {
        async function buscarEpisodio() {
            await axios.get('https://www.omdbapi.com/', {
                params: {
                    i: id,
                    apikey: "e5f5f039"
                }
            })
            .then(res => res.data)
            .then(data => setEpisodio(data))
        }

        buscarEpisodio()
    }, [id])

    return (
        <div className="min-h-dvh bg-primaria text-secundaria">
            <main>
                <section>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-titulo font-bold text-2xl pt-4 ps-4">
                            {episodio.Title}
                        </h2>
                        <p className="ps-4 pb-2 font-corpo">{episodio.imdbRating && `IMDB: ${episodio.imdbRating} ⭐`}</p>
                        <img className="w-full border h-36 object-cover mb-2" src={episodio.Poster} alt="Poster do episódio" />

                        <h3 className="ms-4 font-semibold font-corpo">Enredo</h3>
                        <p className="ms-4 font-corpo mb-4">{episodio.Plot}</p>
                                    
                        <button
                            onClick={() => navigate(`/resumo/${encodeURIComponent(episodio.Title)}`)}
                            className="m-auto w-3/4 rounded-full flex justify-center items-center gap-2 bg-cyan-700 font-corpo py-2 mb-3"
                        >
                            Saiba mais
                        </button>
                        <button
                            onClick={() => navigate(`/teorias/${encodeURIComponent(episodio.Title)}`)}
                            className="m-auto w-3/4 rounded-full flex justify-center items-center gap-2 bg-green-700 font-corpo py-2 mb-3"
                        >
                            Teorias
                        </button>
                        <button
                            onClick={favoritarEP}
                            className="m-auto w-3/4 rounded-full flex justify-center items-center gap-2 border font-corpo py-2 bg-white/5"
                        >
                            Adicionar aos favoritos
                        </button>
                    </div>
                </section>
            </main>
            <Navbar />
        </div>
    );
}

export default Episodio;