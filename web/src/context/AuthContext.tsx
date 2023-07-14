import { createContext, ReactNode, useState } from 'react'
import { destroyCookie, setCookie } from 'nookies'
import Router from 'next/router'

import { api } from '../services/apiClient'

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
}

type AuthProviderProps = {
  children: ReactNode;
} 

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
    name: string,
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
  console.log("ERORR LOGOUT");
  try{
    destroyCookie(null, '@todoList.token', { path: '/' })
    Router.push('/login');

  }catch(err){
    console.log("Error ao sair")
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  //Logar user
  async function signIn({ email, password }: SignInProps){
    try{
      const response = await api.post("/sessions", {
        email,
        password,
      })

      const { id, name, token} = response.data;

      setCookie(undefined, '@todoList.token', token, {
        maxAge: 60 * 60 * 24 * 7, // Expirar em 7 dias
        path: '/'
      })

      setUser({
        id,
        name,
        email
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      
    Router.push('/dashboard')


    }catch(err){
      console.log("ERRO AO ENTRAR", err)
    }
  }
  //Cadastrar user
  async function signUp({ name, email, password}: SignUpProps){
        try{
          const response = await api.post('/users', {
            name,
            email,
            password
          })
    
          Router.push('/login')
    
        }catch(err){
          console.log(err);
        }
  }
    
    //Deslogar user
      async function logoutUser(){
        try{
          destroyCookie(null, '@todoList.token', { path: '/' })
          Router.push('/login')
          setUser(null);
        }catch(err){
          console.log("ERRO AO SAIR", err)
        }
      }


  return(
    <AuthContext.Provider
    value={{ 
        user, 
        isAuthenticated, 
        signIn,
        logoutUser,
        signUp
    }}>
      {children}
    </AuthContext.Provider>
  )
}