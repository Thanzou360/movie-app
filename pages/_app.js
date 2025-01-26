import Aside from "@/components/Aside";
import "@/styles/globals.css";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return <>
    <Aside />
    <div className="container">
      <Header />
    </div>

    <main>
      <Component {...pageProps} />
    </main>

  </>
}
