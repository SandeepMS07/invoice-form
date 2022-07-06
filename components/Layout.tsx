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
      <header className="bg-bg-light text-[#b37d00] sticky top-0 h-[72px] md:hidden flex justify-start items-center drop-shadow-xl z-[900]">
        <div className="flex md:hidden flex-row items-center justify-between">
          <div className="md:hidden flex-1">
            <Image
              src="/assets/images/logo.png"
              alt=""
              height="40px"
              width="40px"
              className="text-white"
            />
          </div>
          <div className="md:hidden ml-80 w-full flex-1" onClick={handleClick}>
            {!nav ? (
              <ImMenu className="w-10 text-2xl text-text" />
            ) : (
              <MdCancel className="w-10 text-2xl text-text" />
            )}
          </div>
        </div>
      </header>
      <ul className="flex flex-col md:flex-row flex-1">
        {router.pathname !== "/Auth/Login" && <Sidebar nav={nav} />}
        <main className="flex-1 overflow-auto w-full xl:h-[10px] h-screen">
          {children}
        </main>
      </ul>
    </div>
  );
};

export default Layout;
