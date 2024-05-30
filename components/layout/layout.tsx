import { PropsWithChildren } from "react";
import Head from "next/head";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>BookShop on Next</title>
        <meta name="description" content="Bookshop with Next" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Ice Daria" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          
      <div>
        <header>
          <Header />
        </header>
          <main className="main">{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}