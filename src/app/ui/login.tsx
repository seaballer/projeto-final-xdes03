'use client'

import Image from "next/image"

export default function LoginForm() {
    const loginAction = async(formData: FormData) => {



        
    }

    return (
        <>
            <form className="form" action={loginAction}>
                <div>
                    <h2>Login</h2>
                </div>
                <div>
                    <section className="input">
                        {/* Imagem de ícone pro input*/}
                        <input type="email" name="email" id="email" placeholder="E-mail" aria-label="E-mail"/>
                    </section>

                    <section className="input">
                        {/* Imagem de ícone pro input*/}
                        <input type="password" name="password" id="password" placeholder="Senha" aria-label="Senha"/>
                    </section>
                </div>
                <button>Entrar</button>
                {/* Implementar botão de cadastro*/}
            </form>
        </>
    )
}