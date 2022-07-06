import { createContext, useContext, useEffect, useState } from 'react'
import { auth, firestore } from "../firebase/client"
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc} from "firebase/firestore"
// import { useRouter } from "next/router";
import { Ring } from '@uiball/loaders'

const AuthContext = createContext({})
export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    // console.log(user)
    // const router = useRouter()

    useEffect(() => {

        async function getUserType(uid) {
            const docRef = doc(firestore, `USUARIO/${uid}`)
            const docSnap = await getDoc(docRef)
            const userDataFirestore = docSnap.data()
            console.log(userDataFirestore)
            return userDataFirestore
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserType(user.uid).then((userDataFirestore) => {
                    if(userDataFirestore.tipo === 'estudiante') {
                        setUser({
                            uid: user.uid,
                            email: user.email,
                            displayName: `${userDataFirestore.nombres} ${userDataFirestore.apellidoPaterno} ${userDataFirestore.apellidoMaterno}`,
                            names: userDataFirestore.nombres,
                            lastName: userDataFirestore.apellidoPaterno,
                            secondSurename: userDataFirestore.apellidoMaterno,
                            type: userDataFirestore.tipo,
                            bookmark: userDataFirestore.bookmark,
                            postulado: userDataFirestore.postulado
                        })
                    } else {
                        setUser({
                            uid: user.uid,
                            email: user.email,
                            displayName: userDataFirestore.nombre,
                            image: userDataFirestore.imagen,
                            type: userDataFirestore.tipo
                        })
                    }
                    // console.log(userDataFirestore.tipo)
                }).finally(() => setLoading(false))
            } else {
                setUser(null)
                setLoading(false)
            }
            // setLoading(false)
        })       

        return () => unsubscribe()
    }, [])
    

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = async () => {
        setLoading(true)
        // setUser(null)
        await signOut(auth).then(setUser(null))
    }

    return (<>
        <AuthContext.Provider value={{ user, signIn, signUp, logOut }}>
            { loading ? 
              <div>
                  <Ring 
                      size={100}
                      lineWeight={5}
                      speed={2} 
                      color="#473198"
                  />
              </div>
            : 
              children }
        </AuthContext.Provider>

        <style jsx>{`
            div {
                display: grid;
                place-content: center;
                align-items: center;
                height : 100vh;
            }
    `}</style>
    </>
    )
}