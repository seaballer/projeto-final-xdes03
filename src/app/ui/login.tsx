'use client'

import Image from "next/image"

export default function Login() {
    return (
        <>
            <form className="form" action="">
                <div>
                    <h2>Login</h2>
                </div>
                <div>
                    <section className="input">
                        <input type="email" name="email" id="email" placeholder="E-mail" aria-label="E-mail"/>
                    </section>

                    <section className="input">
                        <input type="password" name="password" id="password" placeholder="Senha" aria-label="Senha"/>
                    </section>
                </div>
                <button>Entrar</button>
                {/* Implementar botão de cadastro*/}
            </form>
        </>
    )
}