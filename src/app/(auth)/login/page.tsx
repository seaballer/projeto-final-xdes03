'use client';

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import z from "zod";

import userIcon from "public/user.png";
import passwordIcon from "public/padlock.png";

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
    const loginAction = async (formData: FormData) => {
        const loginData: LoginCredentials = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }

        const result = LoginSchema.safeParse(loginData);

        if (!result.success) {
            let errorMsg = "";

            result.error.issues.forEach((issue) => {
                errorMsg = errorMsg + issue.message + ". ";
            })

            toast.error(errorMsg);

            return;
        }

        // Validação de credenciais aqui
    }

    // Estrutura do form:
    // Título no topo
    // Input de login
    // Input de senha
    // Botão de login
    // Botão de cadastro
    return (
        <form className="login-form" action={loginAction}>
            <div>
                <h2>Login</h2>
            </div>
            <div>
                <section className="user-input">
                    <Image
                        src={userIcon}
                        alt="Ícone de usuário"
                    />
                    <input type="email" name="email" id="email" placeholder="E-mail" aria-label="E-mail"/>
                </section>
                <section className="user-input">
                    <Image
                        src={passwordIcon}
                        alt="Ícone de cadeado"
                    />
                    <input type="password" name="password" id="password" placeholder="Senha" aria-label="Senha"/>
                </section>
            </div>
            <button>Entrar</button>
            <div className="link-cadastro">
                Não tem conta? Clique <Link className="btn-cadastro" href="/create">aqui</Link>
            </div>
        </form>
    )
}
