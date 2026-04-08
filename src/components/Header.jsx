import  Link  from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google"
import styles from "./Header.module.css"

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
})

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],

})

export default function Header () {
    return (
        <header className={styles.header}>
            <nav className={styles.navBar}>
                <Link href="/" className={`${styles.logo} ${cormorant.className}`}>
                Choisi
                </Link>
                <ul className={`${styles.menu} ${styles.className}`}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/services">Services</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}