import { Card, Heading, Stack } from "@chakra-ui/react"

import styles from "./services.module.css"


export default function ServicesPage () {
  return (
    <main className={styles.services}>
      <h1>Services</h1>
      <Stack>
        <Card>
          <Heading>Branding</Heading>
        </Card>
        <Card>
          <Heading>Web Design</Heading>
        </Card>
        <Card>
          <Heading>Web Development</Heading>
        </Card>
      </Stack>
    </main>
  )
}