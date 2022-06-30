import type { NextPage } from "next";
import Head from "next/head";
import Login from "./login";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <header className="bg-darkViolet sticky top-0 h-[72px] hidden md:flex justify-start items-center drop-shadow-xl">
        <p className="ml-8 text-white font-semibold uppercase">Dashboard</p>
      </header>
      <div className="flex justify-center items-center min-h-[750px]">
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
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {}
  }
}