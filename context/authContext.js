import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                email: action.payload
            }
        }

        case 'LOGOUT': {
            return {
                ...state,
                email: null
            }
        }

        default: {
            return { ...state }
        }
    }
}

const AuthProvider = ({ children }) => {
    const initialState = {
        email: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState)

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
