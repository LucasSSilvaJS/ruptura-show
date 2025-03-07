import {createContext, useEffect, useState} from 'react'
import {arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore'
import {db, auth} from '../services/firebaseConnection'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

function AuthProvider({children}) {

    const [user, setUser] = useState(null)

    const [loadingLogin, setLoadingLogin] = useState(false)
    const [loadingRegister, setLoadingRegister] = useState(false)

    useEffect(() => {
        function setLocalUser(){
            const userLocal = getLoginInLocalStorage()
            if(userLocal){
                setUser(userLocal)
            }
        }
        setLocalUser()
    }, [])

    function setLoginInLocalStorage(data) {
        localStorage.setItem('@ruptura-login', JSON.stringify(data))
    }

    function removeLoginInLocalStorage() {
        localStorage.removeItem('@ruptura-login')
    }

    function getLoginInLocalStorage() {
        return JSON.parse(localStorage.getItem('@ruptura-login'))
    }

    async function login(email, password) {
        try{
            setLoadingLogin(true)

            const login = await signInWithEmailAndPassword(auth, email, password)

            if(login.user){
                const docRef = doc(db, 'usuarios', login.user.uid)
                const userInfo = await getDoc(docRef)
                
                const user = {
                    id: userInfo.data().id,
                    email: userInfo.data().email,
                    nome: userInfo.data().nome,
                    favoritos: userInfo.data().favoritos
                }
    
                setUser(user)
                setLoginInLocalStorage(user)

                return true
            }

            return false

        }catch(error){
            console.error('Falha ao realizar o login', error)
        }finally{
            setLoadingLogin(false)
        }
    }

    async function logout() {
        try{
            await signOut(auth)
            setUser(null)
            removeLoginInLocalStorage()
        }catch(error){
            console.error('Erro ao deslogar', error)
        }
    }

    async function register(email, password, nome) {
        try{
            setLoadingRegister(true)

            const account = await createUserWithEmailAndPassword(auth, email, password)

            if(account.user){
    
                const newUser = {
                    id: account.user.uid,
                    email: account.user.email,
                    nome,
                    favoritos: []
                }
                
                const docRef = doc(db, 'usuarios', account.user.uid)
    
                await setDoc(docRef, newUser)
    
                setUser(newUser)
                setLoginInLocalStorage(newUser)

                return true
            }

            return false

        }catch(error){
            console.error('Erro ao realizar o cadastro', error)
        }finally{
            setLoadingRegister(false)
        }
    }

    async function adicionarEmFavoritos(dado) {

        const userRef = doc(db, 'usuarios', user.id)
        try {
            await updateDoc(userRef, {
                favoritos: arrayUnion(dado)
            })

            setUser((prevUser) => ({
                ...prevUser,
                favoritos: [...prevUser.favoritos, dado]
            }));
    
            setLoginInLocalStorage({
                ...user,
                favoritos: [...user.favoritos, dado]
            });

            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async function removerFavoritos(dado) {

        const userRef = doc(db, 'usuarios', user.id)
        try {
            await updateDoc(userRef, {
                favoritos: arrayRemove(dado)
            })

            setUser((prevUser) => ({
                ...prevUser,
                favoritos: prevUser.favoritos.filter((fav) => fav !== dado),
            }));
    
            setLoginInLocalStorage({
                ...user,
                favoritos: user.favoritos.filter((fav) => fav !== dado),
            });

            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    return ( 
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                register,
                loadingLogin,
                loadingRegister,
                getLoginInLocalStorage,
                setLoginInLocalStorage,
                adicionarEmFavoritos,
                removerFavoritos
            }}
        >
            {children}
        </AuthContext.Provider>    
    );
}

export default AuthProvider;