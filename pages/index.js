import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import DrawCanvasSection from '../components/draw-canvas-no-ssr'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Luma Blackboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Luma Blackboard
        </h1>

        <p className={styles.description}>
          Get started by hitting the Draw button or by drawing on the blackboard below.
        </p>

        <DrawCanvasSection />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
