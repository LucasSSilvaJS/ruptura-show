import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Resumo() {
    const [titulo, setTitulo] = useState('')
    const {titulo: tituloParam} = useParams()
    const [texto, setTexto] = useState('')

    useEffect(() => {
        setTitulo(decodeURIComponent(tituloParam))
    }, [tituloParam])

    useEffect(() => {

        async function buscarResumoNoGemini() {
            const genAI = new GoogleGenerativeAI("AIzaSyDU-A2dN6E58oMK9kkEFWCvSAwjOUZqchM");
            const model = await genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const prompt = `crie um resumo de 600 caracteres do episódio de Ruptura, ${titulo}`;

            try {
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();
                setTexto(text);
            } catch (error) {
                console.error("Erro ao buscar resumo:", error);
            }
        }

        buscarResumoNoGemini();
    }, [titulo])

    return (
        <div className="min-h-dvh bg-primaria text-secundaria">
            <main>
                <section>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-titulo font-bold text-2xl pt-4 ps-4 mb-2">
                            Resumo
                        </h2>
                        <hr/>
                        <article className="font-corpo p-4">
                            <h3 className="font-semibold">{titulo}</h3>
                            <p>
                                {texto}
                            </p>
                        </article>
                    </div>
                </section>
            </main>
            <Navbar/>
        </div>
    );
}

export default Resumo;