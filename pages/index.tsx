import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/header";

const Home: NextPage = () => {
  return (
    <div className="bg min-h-[100vh]">
      <Head>
        <title>App</title>
      </Head>
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
