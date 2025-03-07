import axios from 'axios';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()

    const [episodios, setEpisodios] = useState([])
    const [temporada, setTemporada] = useState('1')

    useEffect(() => {
        async function buscarEpisodios(){
            await axios.get('https://www.omdbapi.com/', {
                params: {
                    apikey: 'e5f5f039',
                    t: 'Severance',
                    season: temporada
                }
            })
            .then(res => res.data)
            .then(data => data.Episodes)
            .then(eps => setEpisodios(eps))
        }

        buscarEpisodios()
    }, [temporada])

    return (
        <div className="min-h-dvh bg-primaria text-secundaria">
            <main>
                <section>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-titulo font-bold text-2xl p-4">
                            Temporadas
                        </h2>

                        <button 
                            className="w-5/6 block p-4 rounded-xl bg-red-700 mx-auto mb-4 font-corpo"
                            onClick={() => setTemporada('1')}
                        >
                            <article>
                                1° temporada
                            </article>
                        </button>

                        <button
                            className="w-5/6 block p-4 rounded-xl bg-green-700 mx-auto font-corpo"
                            onClick={() => setTemporada('2')}
                        >
                            <article>
                                2° temporada
                            </article>
                        </button>
                    </div>
                </section>
                <section>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-titulo font-bold text-2xl mb-2 p-4">
                            Episódios
                        </h2>
                        <Swiper
                            modules={[EffectCoverflow]}
                            effect="coverflow"
                            centeredSlides={true}
                            breakpoints={{
                                320: { slidesPerView: 1.6, spaceBetween: 10 },
                                768: { slidesPerView: 2.2, spaceBetween: 20 },
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                        >
                            {episodios.length > 0 && episodios.filter(ep => !ep.Title.match('Episode')).map((ep) => (
                                <SwiperSlide key={ep.imdbID}>
                                    <article 
                                        className="bg-slate-400 min-h-48 rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer"
                                        onClick={() => navigate(`/episodios/${ep.imdbID}`)}
                                    >
                                        <h2 className="text-secundaria drop-shadow-2xl text-lg font-bold font-corpo">Episódio {ep.Episode}</h2>
                                        <p className="font-semibold text-gray-600 font-corpo text-center">{ep.Title}</p>
                                        <p className="font-corpo">{ep.imdbRating === 'N/A' ? '' : 'Imdb: ' + ep.imdbRating + ' ⭐'}</p>
                                    </article>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>
            </main>
            <Navbar/>
        </div>
    );
}

export default Home;