"use server";

import { jwtVerify } from "jose";
import type { JWTClaimSet } from "jose";    // Esse tipo é mais robusto que o JWTPayload genérico (segundo a internet)

const obterChave = (): Uint8Array => {
    const chave = process.env.TOKEN;
    if (!chave) {
        throw new Error("TOKEN não definido");
    }

    return new TextEncoder().encode(chave);
}

async function verificarTokenSessao<T = JWTClaimSet>(token: string): Promise<T> {
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
        const {payload} = await jwtVerify(token, obterChave(), {
            algorithms: ["HS256"] 
        });
        return payload as T;
    }
}