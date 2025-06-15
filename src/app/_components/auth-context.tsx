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

const AuthContext = createContext<AuthContextType>({})

export const AuthProvider = ({ children, user }: AuthProviderType) => {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}
