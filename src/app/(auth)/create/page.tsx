"use client";

import toast from "react-hot-toast";
import { z } from "zod";

import { LoginCredentials } from "../login/page";
import { criarUsuario } from "@/app/lib/credentials";
import { redirect } from "next/navigation";
import Image from "next/image";

import userIcon from "public/user.png";
import passwordIcon from "public/padlock.png";

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
    const createAction = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confPassword = formData.get("conf-password") as string;
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
                redirect("/login");
            }
        } catch (error: any) {
            toast.error("Erro ao criar usuário");
            console.error("Erro ao criar usuário");
        }
    }

    return (
        <form className="login-form" action={createAction}>
            <div>
                <h2>Cadastro</h2>
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
                <section className="user-input">
                    <Image
                        src={passwordIcon}
                        alt="Ícone de cadeado"
                    />
                    <input type="password" name="conf-password" id="conf-password" placeholder="Confirmar Senha" aria-label="Confirmar Senha"/>
                </section>
            </div>
            <button>Cadastrar</button>
        </form>
    )
}