"use client";
import  Link  from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google"
import styles from "./Header.module.css"
import { useState } from "react";
import { Menu, X } from "lucide-react";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
})

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],

})

export default function Header () {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className={styles.header}>
            <nav className={styles.navBar}>
                <Link href="/" className={`${styles.logo} ${cormorant.className}`}>
                Choisi
                </Link>
                <button
                    className={styles.menuButton}
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    type="button"
                    aria-expanded={isOpen}
                >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    
                </button>

                <ul className={`${styles.menu} ${inter.className} ${isOpen ? styles.open : ""}`} >
                    <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                    <li><Link href="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
                    <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
                    <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}