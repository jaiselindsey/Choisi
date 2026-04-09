"use client"

import React, { useState } from "react"
import Header from "../../components/Header"
import styles from "./contact.module.css"

export default function ContactPage () {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

    async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault() 
        setStatus("sending")

        const form = e.currentTarget
        const formData = new FormData(form)

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            businessName: formData.get("businessName"),
            message: formData.get("message"),
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                throw new Error("Failed to submit form")
            }
            setStatus("sent")
            form.reset()
        } catch (error) {
            setStatus("error")
        }

    }

    return (
        <main className={styles.contactPage}>

            <Header />
            <div className={styles.overlay}/>
            <div className={styles.content}>
                <p className={styles.kicker}>Contact</p>
                <h1 className={styles.title}>
                    Let's create something great together.
                </h1>
                <p className={styles.description}>
                    Tell us about your business, your goals, and how we can help. The more details you provide, the better we can understand your needs and tailor our services to help you achieve your vision.
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input 
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="phone" className={styles.label}>Phone</label>
                        <input 
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Your phone number"
                            className={styles.input}
                        /> 
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="businessName" className={styles.label}>Business Name</label>
                        <input 
                            id="businessName"
                            name="businessName"
                            type="text"
                            placeholder="Your business name"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="message" className={styles.label}>Project Details</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your project and how we can help"
                            className={styles.textarea}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button} disabled={status === "sending"}>
                        {status === "sending" ? "Sending..." : "Send Inquiry"}
                    </button>

                    {status === "sent" && (
                        <p className={styles.success}>Inquiry sent successfully!</p>
                    )}

                    {status === "error" && (
                        <p className={styles.error}>Failed to send inquiry. Please try again.</p>
                    )}
                </form>
            </div>
        </main>
    )
}
