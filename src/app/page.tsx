import Header from "../components/Header"
import styles from "./page.module.css"
export default function HomePage () {
  return (
    <main>
      <Header />
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <p className={styles.kicker}>Premium Digital Presence</p>
          <h1 className={styles.title}>Digital Presence, chosen with intention</h1>

          <p className={styles.description}>
            Choisi designs elevated digital experiences that feel intentional, polished, and premium helping modern brands stand apart with clarity, style, and presence.
          </p>
          <div className={styles.actions}>
            <a href="/contact" className={styles.primaryBtn}>
            Start Your Project
            </a>
            <a href="/services" className={styles.secondaryBtn}>
            Explore Services
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}