'use client'

import { createContext, ReactNode, useContext, useEffect, useMemo, useState, useTransition } from 'react'

import { User } from '#/user'



type AuthContextType = {
  user?: User
}

type AuthProviderType = {
  children: ReactNode
  token?: string
  user?: User
}

const AuthContext = createContext<AuthContextType>({

})

export const AuthProvider = ({ children, token, user }: AuthProviderType) => {
 

  useEffect(() => {
    if (token) {
console.log('có token');

    } else console.log('ko có token');
  }, [token, user])

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
  
    </AuthContext.Provider>
  )
}












  
