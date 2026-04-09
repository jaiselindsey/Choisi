import { ChevronRightIcon } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
 } from "@/components/ui/card"

import styles from "./services.module.css"
import Header from "../../components/Header"


export default function ServicesPage () {
  return (
    <main className={styles.services}>
        <Header />
        <div className={styles.overlay}/>

        <div className={styles.content}> 
            <h1 className={styles.kicker}>Services</h1>   
            <h2 className={styles.title}>Refined digital work, built for impact.</h2>
            <p className={styles.description}>Choisi offers a range of digital services designed to elevate your online presence and drive meaningful results.</p>
            <div className={styles.grid}>
                <Card className={styles.card}>
                    <CardHeader>
                        <CardTitle className={styles.cardTitle}>Web Design</CardTitle>
                        <CardDescription className={styles.cardDescription}>
                            We create visually stunning and user-friendly websites that captivate your audience and drive results.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className={styles.card}>
                    <CardHeader>
                        <CardTitle className={styles.cardTitle}>Development</CardTitle>
                        <CardDescription className={styles.cardDescription}>
                            Our development team builds robust and scalable web applications tailored to your business needs, ensuring seamless performance and user experience.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className={styles.card}>
                    <CardHeader>
                        <CardTitle className={styles.cardTitle}>Consulting</CardTitle>
                        <CardDescription className={styles.cardDescription}>
                            Our consulting services help businesses make informed digital decisions through strategic guidance on website direction, online presence, and brand clarity.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>    
    </main>
  )
}