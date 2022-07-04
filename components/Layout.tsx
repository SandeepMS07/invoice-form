import Image from "next/image";
import { MdOutlineDashboard, MdCancel } from "react-icons/md";
import { ImMenu } from "react-icons/im";
import { TiClipboard } from "react-icons/ti";

import { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [nav, setNav] = useState(false);
  const router = useRouter();

  const handleClick = () => setNav(!nav);
  return (
    <div>
      <header className="bg-darkViolet sticky top-0 h-[72px] md:hidden flex justify-start items-center drop-shadow-xl z-[900]">
        <div className="flex md:hidden flex-row items-center justify-between">
          <p className="ml-8 text-white font-semibold uppercase">Invoice</p>
          <div className="md:hidden" onClick={handleClick}>
            {!nav ? (
              <ImMenu className="w-10 text-2xl text-white" />
            ) : (
              <MdCancel className="w-10 text-2xl text-white" />
            )}
          </div>
          <div className="md:hidden ml-80 w-full">
            <Image
              src="/assets/images/logobluecion.png"
              alt=""
              height="40px"
              width="40px"
              className="text-white"
            />
          </div>
        </div>
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        {router.pathname !== "/Auth/Login" && <Sidebar />}

        <main className="flex-1 overflow-auto w-full xl:h-[10px] h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
