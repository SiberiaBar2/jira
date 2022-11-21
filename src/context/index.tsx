import React, { ReactNode } from "react"
import { QueryClientProvider , QueryClient} from "react-query"
import { AuthProvider } from "./auth-context"

export const AppProviders = ({children}: {children: ReactNode}) => {
    
    return <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
        {children}
    </AuthProvider>
    </QueryClientProvider>
}
export function logout() {
    throw new Error('Function not implemented.')
}