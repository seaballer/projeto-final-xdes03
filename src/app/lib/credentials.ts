'use server';

import * as bcrypt from 'bcrypt';

const arquivo = 'usuarios.json';

export interface LoginCredentials {
    email:string,
    password:string
}

export async function createUser(data:LoginCredentials) {
    const email = (data.email as string).trim();
    const password = data.password as string;

    const passwordCrypt = await bcrypt
}


