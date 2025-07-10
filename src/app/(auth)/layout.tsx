import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

export default function AuthLayout({children}:{children:React.ReactNode}) {
    return (
        <main>
            {children}
        </main>
    )
}