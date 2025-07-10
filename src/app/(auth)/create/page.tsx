"use client";

import toast from "react-hot-toast";
import { z } from "zod";

import { LoginCredentials } from "../login/page";
import { criarUsuario } from "@/app/lib/credentials";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Box, Button, InputAdornment, TextField, Typography, Link as MuiLink } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import Link from "next/link";

const MIN_PASSWORD_LENGTH = 8;

const CreateSchema = z.object({
    email: z.string()
        .trim()
        .email('Email com formato incorreto'),
    password: z.string({message: 'Insira uma senha'})
        .min(MIN_PASSWORD_LENGTH, {message: `Senha requer no mínimo ${MIN_PASSWORD_LENGTH} caracteres`})
        .regex(/^\S.*\S$|^\S$/, "A senha não pode começar nem terminar com espaço"),
    confPassword: z.string({message: "Insira uma confirmação de senha"})
        .trim()
        .min(1, {message: "Confirme a senha"})
}).refine((data) => data.password === data.confPassword, {
    message: "Senhas não conferem",
    path: ["confPassword"]
});

export default function CreateUser() {
    // precisamos usar o useRouter aqui pq a página create é client-side!!!
    const router = useRouter();

     const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confPassword = formData.get("confPassword") as string;
        const data = {email, password, confPassword};

        const resultado = CreateSchema.safeParse(data);
        if (!resultado.success) {
            const errorMsg = resultado.error.issues
                .map(issue => issue.message)
                .join(". ") + ".";
            
            toast.error(errorMsg);
            return;
        }

        try {
            const retorno = await criarUsuario(data as LoginCredentials);
            
            if (retorno.error) {
                toast.error(retorno.error);
            } else if (retorno.success) {
                toast.success(retorno.success);
                router.push("/login");
            }
        } 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any    
        catch (error: any) {
            toast.error("Erro ao criar usuário");
            console.log(error);
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                maxWidth: 360,
                mx: 'auto',
                mt: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3
            }}
        >
            <Typography variant="h4" align="center">
                Cadastro
            </Typography>

            <TextField
                name="email"
                id="email"
                type="email"
                label="E-mail"
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Email />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <TextField
                name="password"
                id="password"
                type="password"
                label="Senha"
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                    <Lock />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <TextField
                name="confPassword"
                id="confPassword"
                type="password"
                label="Confirmar senha"
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                    <Lock />
                            </InputAdornment>
                        ),
                    },
                }}
            />

            <Button type="submit" variant="contained" fullWidth>
                Cadastrar
            </Button>
            
            <Typography variant="body1" align="center">
                Já possui cadastro?{' '}<MuiLink component={Link} href="/login" underline="hover">Login</MuiLink>
            </Typography>

        </Box>
    )
}