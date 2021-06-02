import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api/v1";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
