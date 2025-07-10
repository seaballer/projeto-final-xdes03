import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Footer from "./ui/footer";
import Header from "./ui/header";
import { obterSessaoSeValida } from "./lib/session";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "MyGameList",
  description: "Biblioteca pessoal de jogos",
  icons: {
    icon: '/icon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const sessao = await obterSessaoSeValida()

  return (
    <html lang="en">
      <body
        style={{
            margin: 0,
            padding: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}
      >
        <Header sessao={sessao} />
        <Box sx={{flex:1}}>
          {children}
        </Box>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
