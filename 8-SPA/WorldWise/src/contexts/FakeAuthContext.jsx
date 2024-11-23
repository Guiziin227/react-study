import {createContext, useContext, useReducer} from "react";

const AuthContext = createContext()

const initialState = {
    user: null,
    isAuthenticated: false,
}

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case "logout":
            return {
                ...initialState,
            }
        default: {
            throw new Error("Unable to log in")
        }
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};


function AuthProvider({children}) {

    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({type: "login", payload: FAKE_USER})
        console.log(user)
    }

    function logout() {
        dispatch({type: "logout"})
    }

    return <AuthContext.Provider value={{
        logout, login, user, isAuthenticated
    }}>{children}</AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) throw new Error("AuthProvider returns undefined");
    return context
}

export {AuthProvider, useAuth}
