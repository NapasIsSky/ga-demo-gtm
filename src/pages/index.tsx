import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import CardList from "@/components/CardList";
import { productData } from "@/data";
import CartIcon from "@/components/CartIcon";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Demo Google Tag Managment</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <h1 className={styles.webTitle}>TOFUU E-MERCHANT</h1>
        <CardList productList={productData} />
        <div onClick={() => {}} className={styles.cartBtn}>
          <CartIcon className={styles.cartIcon} />
          <div className={styles.cartBadge}>
            <h4>9+</h4>
          </div>
        </div>
      </main>
    </>
  );
}
