"use client"
import {createContext, useContext, JSX, useState, useEffect} from "react";
import {LoginCheckApi} from "@/generated/sdk";


interface CredentialsInterface {
    email: string,
    password: string
}

interface LoginResponse {
    success: boolean
}

interface AuthContextInterface {
    token: string | null,
    login: (cred : CredentialsInterface) => Promise<LoginResponse>,
    logout: () => void,
    isAuthenticated: boolean,
    isLoadingAuth: boolean
}

const AuthContext = createContext<AuthContextInterface>({
    token: null,
    login: async (cred : CredentialsInterface) => { return {success: false} },
    logout: () => {  },
    isAuthenticated: false,
    isLoadingAuth: true
});
const loginCheckApi = new LoginCheckApi()

export const useAuth: () => AuthContextInterface = () => {
    const context: AuthContextInterface = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({
                                 children,
                             }: Readonly<{
    children: React.ReactNode;
}>) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwt_token');
        if (storedToken) {
            if (isTokenValid(storedToken)) {
                setToken(storedToken);
                // fetchUserInfo(storedToken);
            } else {
                localStorage.removeItem('jwt_token');
                setToken("")
            }
        }
        setIsLoadingAuth(false);
    }, []);

    const isTokenValid = (token: string) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp > currentTime;
        } catch (error) {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setToken(null);
        location.pathname = '/login';
    };

    const login: (credentials: CredentialsInterface) => Promise<LoginResponse> = async credentials => {
        setIsLoadingAuth(true);
        try {
            const response = await loginCheckApi.loginCheckPost({
                loginCheckPostRequest: {
                    email: credentials.email,
                    password: credentials.password
                }
            });

            localStorage.setItem('jwt_token', response.token);
            setToken(response.token);
            setIsLoadingAuth(false);

            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            setToken(null);
            setIsLoadingAuth(false);
            return { success: false };
        }
    };

    const value = {
        token,
        login,
        logout,
        isAuthenticated: !!token && isTokenValid(token),
        isLoadingAuth
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}