"use client";

import { criarUsuario } from "@/app/lib/credentials";
import toast from "react-hot-toast";
import { z } from "zod";
import { LoginCredentials } from "../login/page";
import { redirect } from "next/navigation";

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
    const clientCreateUser = async (formData: FormData) => {
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
}

// implementar HTML. Preguiça