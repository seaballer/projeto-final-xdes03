import Link from "next/link"

export default function Header() {
    return (
        <header>
            <section className=''>
            <h2><Link href="/dashboard">MyGameList</Link></h2>
            <nav>
                <ul>
                    <li><Link href='https://rawg.io/apidocs' target="blank">RAWG API</Link></li>
                </ul>
            </nav>
            </section>
        </header>
    )
}