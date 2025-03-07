import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

function Calendario() {

    const [lancamentos, setLancamentos] = useState([])

    function formatarData(dataString) {
        if (!dataString) return "Data indisponível"
        const data = new Date(dataString)
        const dia = String(data.getDate()).padStart(2, "0")
        const mes = String(data.getMonth() + 1).padStart(2, "0")
        const ano = data.getFullYear()

        return `${dia}/${mes}/${ano}`
    }

    useEffect(() => {
        async function buscarLancamentos(params) {
            const dataAtual = new Date()

            await axios.get('https://api.tvmaze.com/shows/44933/episodes')
            .then(res => res.data)
            .then(data => data.filter(ep => {
                const dataEpisodio = new Date(ep.airdate)
                return dataEpisodio >= dataAtual
            }))
            .then(data => setLancamentos(data))            
        }

        buscarLancamentos()
    }, [])

    return ( 
        <div 
            className="min-h-dvh bg-primaria text-secundaria"
            style={{marginBottom: '78px'}}
        >
            <main>
                <section>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-titulo font-bold text-2xl p-4">
                            Próximos episódios
                        </h2>
                        {lancamentos.length > 0 && lancamentos.map((lancamento, index) => (
                            <article className="bg-slate-400 w-3/4 mx-auto mb-4 rounded p-2 flex flex-col justify-center items-center" key={index}>
                                <h2 className="font-bold font-corpo">{lancamento.name}</h2>
                                <p className="font-semibold text-gray-600 font-corpo">{formatarData(lancamento.airdate)}</p>
                            </article>
                        ))}
                        {lancamentos.length === 0 && <p className="text-center">Infelizmente, só na próxima temporada! 😢</p>}
                    </div>
                </section>
            </main>
            <Navbar/>
        </div>
     );
}

export default Calendario;