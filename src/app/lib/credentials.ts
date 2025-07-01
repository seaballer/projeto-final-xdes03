"use server";

import bcrypt from 'bcrypt';    // npm i bcrypt

import { LoginCredentials } from "../(auth)/login/page";
import DB from "./db";
import { criarTokenSessao } from './session';
import { redirect } from 'next/navigation';

const dbUsuarios = "usuarios.json";

// função auxiliar
function encontrarUsuarioPorEmail(usuarios: any[], email: string) {
    return usuarios.find(user => user.email.toLowerCase() === email.toLowerCase()); // usar lowercase pra evitar dupes como AAA@site e aaa@site
}

export async function criarUsuario(data: LoginCredentials) {
    const {email, password} = data;
    const usuarios = await DB.dbLer(dbUsuarios);
    
    if (encontrarUsuarioPorEmail(usuarios, email))
        return {error: "Usuário já existe"};

    const novoUser = {
        id: crypto.randomUUID(),
        email,
        password: await bcrypt.hash(password, 10)
    }
    
    usuarios.push(novoUser);
    DB.dbSalvar(dbUsuarios, usuarios);

    return {success: "Usuário criado com sucesso"};
}

export async function validarCredentials(data: LoginCredentials) {
    const {email, password} = data;

    const usuarios = await DB.dbLer(dbUsuarios);
    
    // validação usuário
    const user = encontrarUsuarioPorEmail(usuarios, email)
    if (!user)
        return {error: "Usuário não encontrado"}

    // validação senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        await criarTokenSessao(user.id, user.email);
        redirect("/dashboard");
    }
    else {
        return {error: "Usuário ou senha incorretos"};
    }
}
