"use server";

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const obterChave = (): Uint8Array => {
    const chave = process.env.TOKEN;
    if (!chave) {
        throw new Error("TOKEN não definido");
    }

    return new TextEncoder().encode(chave);
}

async function verificarTokenSessao(token: string) {
    // passo a passo pra colocar a token no seu PC:
    // (bash)
    // touch .env                                           ; cria o arquivo .env na pasta
    // node                                                 ; abre o terminal node
    // require('crypto').randomBytes(64).toString('hex')    ; gera um token base64
    // .exit                                                ; pode fechar o terminal agora
    // Dentro do .env, escreve
    // TOKEN=
    // e cole a token gerada SEM AS ASPAS.
    // Isso só precisa ser feito uma vez
    try {
        const chave = await jwtVerify(token, obterChave(), {
            algorithms: ["HS256"] 
        });
        return chave.payload;
    }
    catch (erro) {
        console.error("Token inválido", erro);
        return null;
    }
}

export async function criarTokenSessao(userId: string, userEmail: string) {
    const chave = obterChave();
    const expiracao = new Date(Date.now() + 60*60*1000);    // 1h
    const sessao = await new SignJWT({userId, userEmail})
    .setProtectedHeader({alg:"HS256"})
    .setExpirationTime("1h")
    .sign(chave)
    
    const cookieStore = await cookies();
    cookieStore.set("session", sessao, {
        path: "/",
        httpOnly: true,
        expires: expiracao
    });
}

export async function obterSessao() {
    const cookieSessao = (await cookies()).get("session");

    if (!cookieSessao)
        return null;

    const sessao = await verificarTokenSessao(cookieSessao.value);
    return sessao;
}

export async function deletarCookieSessao() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}
