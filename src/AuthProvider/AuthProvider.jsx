import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const userRegistration = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userLogout = () => {
        return signOut(auth);
    }
    
    const authInfo = {
        user,
        loader,
        userRegistration,
        setUser,
        userLogin, 
        userLogout
    }

    

    //observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log('current user', currentUser);
            setLoader(false);

            if(currentUser && currentUser.email){
                const loggedUser = {
                    email: currentUser.email
                }                

                fetch('http://localhost:5000/jwt', {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(loggedUser)
            })
            .then(res => res.json())
            .then(data => {
                // console.log('jwt response', data);
                localStorage.setItem('doc-appointment-token', data.token)
                // set the token from data.token to localStorage
            })
            }
            else{
                localStorage.removeItem('doc-appointment-token')
            }

            // console.log(loggedUser);

            
        });
        return () => {
            return unsubscribe();
        }
    }, [])
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;