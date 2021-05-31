import Head from "next/head";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div className="bg-gradient-to-b from-primary via-secondary">
        <Navbar />

        <div className="mt-20">
          <h1 className="text-center text-6xl font-bold tracking-tighter mb-2">Sistem Pintar Pengatur Jalan</h1>
          <h1 className="text-center text-3xl font-medium text-secondary">Berbasis Computer Vision dan IoT</h1>
          <div className="items-center bg-all-system bg-cover h-96 w-7/12 m-auto"></div>
        </div>

        <div>
          <h2 className="text-center text-4xl mb-5 mt-48 font-semibold">Our Services</h2>
          <div className="flex justify-center flex-col items-center">
            <Image src="/images/realtime-monitoring.png" width={100} height={100} layout="fixed" />
            <span className="block text-primary">Realtime Monitoring</span>
          </div>

          <div className="w-8/12 m-auto">
            <div className="flex flex-row justify-between mt-20">
              <div className="flex justify-center flex-col items-center">
                <Image src="/images/kecepatan.png" width={150} height={100} className="block" />
                <span className="text-primary">Speed Detection</span>
              </div>

              <div className="flex justify-center flex-col items-center">
                <Image src="/images/safety.png" width={120} height={100} className="block" />
                <span className="text-primary">Safety</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
