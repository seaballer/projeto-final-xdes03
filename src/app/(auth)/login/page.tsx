'use client';

import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import z from "zod";
import Link from "next/link";   // diferente do link do mui que é estilização apenas

import { Box, Button, InputAdornment, Link as MuiLink, TextField, Typography } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

import { validarCredentials } from "@/app/lib/credentials";

export interface LoginCredentials {
    email: string,
    password: string
}

const MIN_PASSWORD_LENGTH = 8;

const LoginSchema = z.object({
    email: z.string()
        .trim()
        .email('Email com formato incorreto'),
    password: z.string({message: 'Insira uma senha'})
        .min(MIN_PASSWORD_LENGTH, {message: `Senha requer no mínimo ${MIN_PASSWORD_LENGTH} caracteres`})
        .regex(/^\S.*\S$|^\S$/, "A senha não pode começar nem terminar com espaço")
})

export default function LoginPage() {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const loginData: LoginCredentials = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        };

        const result = LoginSchema.safeParse(loginData);

        if (!result.success) {
            const errorMsg = result.error.issues.map(issue => issue.message).join(". ") + ".";
            toast.error(errorMsg);
            return;
        }

        const loginValidacao = await validarCredentials(loginData);

        if (loginValidacao) {
            toast.error(loginValidacao.error);
            return;
        }

        toast.success("Login realizado com sucesso!");
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
                Entrar
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

            <Button type="submit" variant="contained" fullWidth>
                Entrar
            </Button>

            <Typography variant="body1" align="center">
                Não tem conta? Clique{' '}<MuiLink component={Link} href="/create" underline="hover">aqui</MuiLink>
            </Typography>

        </Box>
    )
}
