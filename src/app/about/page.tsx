import Header from "@/components/Header";
import styles from "./about.module.css"

export default function AboutPage () {
    return (
        <main className={styles.about}>
            <Header />
            <div className={styles.overlay}/>

            <div className={styles.content}>
                <p className={styles.kicker}>About</p>
                <h1 className={styles.title}>Choisi is a company that creates beautiful digital experiences.</h1>
                <p className={styles.description}>Choisi is a digital design and development company that creates beautiful, intentional, and impactful digital experiences for modern brands. We believe that every brand deserves a digital presence that reflects their unique identity and values, and we work closely with our clients to bring their vision to life.
                </p>

                <div className={styles.grid}>
                    <section className={styles.card}>
                        <h2 className={styles.cardTitle}>Our Mission</h2>
                        <p className={styles.cardText}>Every project we undertake is driven by a commitment to excellence and a deep understanding of our clients needs. We strive to create digital experiences that not only meet but exceed expectations, delivering value and impact for every brand we work with.
                        </p>
                    </section>

                    <section className={styles.card}>
                        <h2 className={styles.cardTitle}>Our Values</h2>
                        <p className={styles.cardText}>We are committed to integrity, creativity, and collaboration in everything we do. These values guide our approach to design and development, ensuring that we deliver solutions that are not only effective but also aligned with our clients goals and vision.
                        </p>
                    </section>

                    <section className={styles.card}>
                        <h2 className={styles.cardTitle}>Choosing Choisi</h2>
                        <p className={styles.cardText}>Choosing Choisi means partnering with a team that understands the power of great design and development. We create digital experiences that resonate with your audience and drive real results.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}