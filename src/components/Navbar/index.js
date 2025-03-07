import { useContext } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { GrFavorite } from "react-icons/gr";
import { MdLiveTv } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

function Navbar() {
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)

    async function sair() {
        await logout()
    }

    return (
        <nav
            className='fixed bottom-0 w-full flex justify-center p-6 gap-8 shadow-2xl shadow-gray-300 bg-slate-800'
        >
            <button
                onClick={() => {
                    navigator.vibrate(200)
                    navigate('/calendario')
                }}
            >
                <BsCalendar2Date size={30} />
            </button>
            <button
                onClick={() => {
                    navigator.vibrate(200)
                    navigate('/home')
                }}
            >
                <MdLiveTv size={30} />
            </button>
            <button
                onClick={() => {
                    navigator.vibrate(200)
                    navigate('/favoritos')
                }}
            >
                <GrFavorite size={30} />
            </button>
            <button
                onClick={() => {
                    navigator.vibrate(200)
                    sair()
                }}
            >
                <RiLogoutBoxRFill size={30} className="text-red-600" />
            </button>
        </nav>
    );
}

export default Navbar;