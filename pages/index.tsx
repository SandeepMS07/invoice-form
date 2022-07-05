import type { NextPage } from "next";
import Head from "next/head";
import Login from "./Auth/Login";


const Home: NextPage = () => {
  return (
    <div className="bg-gray-300">
      <Head>
        <title>Dashboard</title>
        
      </Head>
      {/* <header className="bg-darkViolet sticky top-0 h-[72px] hidden md:flex justify-start items-center drop-shadow-xl">
        <p className="ml-8 text-white font-semibold uppercase">Dashboard</p>
      </header> */}
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-5xl font-bold ">Dashboard</h1>
      </div>
    </div>
  );
};

export default Home;
export function getServerSideProps(ctx: { req: { cookies: any; }; }) {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "../Auth/Login",
        permanent: false,
      },
    };
  }
  return {
    props: {}
  }
}