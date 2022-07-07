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
  const hide_navbar = () => setNav(!nav);
  return (
    <div>
      {router.pathname !== "/Auth/Login" && (
        <header className="bg-bg-black text-white sticky top-0 h-[72px] md:hidden flex justify-start items-center border-b-[1px] border-border z-[900]">
          <div className="flex md:hidden ml-1 flex-row items-center justify-between">
            <div className="md:hidden flex-1">
              <Image
                src="/assets/images/logo.png"
                alt=""
                height="50px"
                width="50px"
                className="text-white"
              />
            </div>
            <div
              className="md:hidden ml-80 mb-1 w-full flex-1"
              onClick={handleClick}
            >
              {!nav ? (
                <ImMenu className="w-10 text-3xl text-white" />
              ) : (
                <MdCancel className="w-10 text-3xl text-white" />
              )}
            </div>
          </div>
        </header>
      )}
      <ul className="flex flex-col md:flex-row flex-1">
        {router.pathname !== "/Auth/Login" && (
          <Sidebar nav={nav} func={hide_navbar} />
        )}
        <main className="flex-1 overflow-auto w-full xl:h-[10px] h-screen">
          {children}
        </main>
      </ul>
    </div>
  );
};

export default Layout;
