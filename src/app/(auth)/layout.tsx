import React from "react";

export default function AuthLayout({children}:{children:React.ReactNode}) {
    return (
        <main>
            <h1>MyGameList</h1>
            {children}
        </main>
    )
}