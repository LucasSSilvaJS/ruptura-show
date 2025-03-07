import { Link } from "react-router-dom";
import lumonIcon from "../../assets/lumon.png";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from '../../contexts/auth'

function Cadastro() {

    const { register, loadingRegister } = useContext(AuthContext)

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function resetarCampos(){
        setNome('')
        setEmail('')
        setSenha('')
    }

    async function fazerCadastro(e){
        e.preventDefault()
        if(nome && email && senha){
            const account = await register(email, senha, nome)
            if(account){
                toast.success('Usuário registrado com sucesso')
                resetarCampos()
            }
            else{
                toast.warn('Não é possível registrar essa conta!')
            }
        }else{
            toast.error('Preencha todos os campos!')
        }
    } 

    return ( 
        <main className="bg-primaria min-h-dvh text-secundaria">
            <img className="absolute top-8 right-8 w-24" src={lumonIcon} alt="Lumon" />
            <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <header className="mb-4">
                    <h1 className="font-titulo mb-1">
                        Ruptura Show
                    </h1>
                    <hr/>
                </header>
                <form className="text-center grid grid-cols-1" onSubmit={fazerCadastro}>
                    <input 
                        className="font-corpo mb-4 p-4 outline-none placeholder:text-secundaria rounded-2xl bg-transparent border border-secundaria" 
                        type="text" 
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        className="font-corpo mb-4 p-4 outline-none placeholder:text-secundaria rounded-2xl bg-transparent border border-secundaria" 
                        type="email" 
                        placeholder="Digite seu email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        className="font-corpo mb-4 p-4 outline-none placeholder:text-secundaria rounded-2xl bg-transparent border border-secundaria" 
                        type="password" 
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <input 
                        className="font-corpo mb-8 bg-secundaria text-primaria rounded-2xl font-bold p-1 cursor-pointer" 
                        type="submit" 
                        value="Cadastrar"
                    />
                    <Link 
                        className="font-corpo p-1 rounded bg-black/50"
                        to='/'
                    >
                        Realize seu login
                    </Link>
                </form>
            </section>
        </main>
     );
}

export default Cadastro;