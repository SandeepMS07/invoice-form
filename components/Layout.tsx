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
        <header className="bg-bg-black text-white sticky top-0 h-[72px] md:hidden justify-start border-b-[1px] border-border z-[900]">
          <div className="flex flex-row ml-1 items-center">
            <div className="w-1/6 mt-3">
              <Image
                src="/assets/images/logo.png"
                alt=""
                height="50px"
                width="50px"
                className="text-white"
              />
            </div>
            <div className="w-4/6 text-start">
              <h4 className="text-xl font-semibold">Darwin</h4>
            </div>
            <div className="md:hidden w-1/6" onClick={handleClick}>
              {!nav ? (
                <ImMenu className="w-10 text-2xl text-white" />
              ) : (
                <MdCancel className="w-10 text-2xl text-white" />
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
