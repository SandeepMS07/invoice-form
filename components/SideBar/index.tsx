import { useState } from "react";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";

import { TiClipboard } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const Menus = [
    { title: "Dashboard", href: "/" },
    {
      title: "Marketing",
      src: "/assets/images/marketing.png",
      icon: <TiClipboard />,
    },
    { title: "Packages", spacing: true, src: "/assets/images/packages.png" },
    {
      title: "Support",
      src: "/assets/images/support.png",
      submenu: true,
      submenuItems: [
        {
          title: "Invoice",
          icon: <TiClipboard />,
          href: "/CustomerSupport/Invoice",
        },
      ],
    },
    { title: "Analytics", src: "/assets/images/analytics.png" },
    { title: "Settings", src: "/assets/images/settings.png" },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-bg-light h-screen p-5 pt-8 ${
          open ? "w-60" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`absolute  -right-3 top-9 border z-[900] bg-white text-[#b37d00] text-3xl rounded-full  border-[#cc8f00] cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => {
            setOpen(!open);
          }}
        />
        <Link href="/" passHref>
          <div className="flex gap-x-4 mb-10 items-center">
            <Image
              src="/assets/images/logo.png"
              alt=""
              height={"40px"}
              width={"40px"}
              className={`duration-500  cursor-pointer ${
                !open && "rotate-[360deg]"
              }`}
            />

            <h1
              className={`text-Gray-mine-shaft origin-left ml-2 font-bold  text-2xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Darwin
            </h1>
          </div>
        </Link>

        <ul>
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#ffe8b3] rounded-md  
                   mt-3
                }`}
              >
                <span
                  className={`text-2xl block float-left ease-in-out duration-300`}
                  onClick={() => {
                    !open ? setOpen(true) : "";
                  }}
                >
                  {menu.src ? (
                    <Image
                      src={menu.src}
                      alt=""
                      height={"30px"}
                      width={"30px"}
                      className={`mr-2 duration-500 text-4xl rounded cursor-pointer block float-left"
                      }`}
                    />
                  ) : (
                    <Image
                      src="/assets/images/dashboard.png"
                      alt=""
                      height={"30px"}
                      width={"30px"}
                      className={`mr-2 duration-500 text-4xl rounded cursor-pointer block float-left"
                        }`}
                    />
                  )}
                </span>
                <Link
                  href={`${menu.href ? menu.href : (menu.href = "")}`}
                  passHref
                >
                  <span
                    className={`text-base text-Gray-mine-shaft font-medium flex-1 ease-in-out delay-150  duration-300 ${
                      !open && "hidden"
                    }`}
                    onClick={() => {
                      !submenuOpen
                        ? setSubmenuOpen(true)
                        : setSubmenuOpen(false);
                    }}
                  >
                    {menu.title}
                  </span>
                </Link>

                {menu.submenu && (
                  <BsChevronDown
                    className={`text-Gray-mine-shaft ${
                      submenuOpen && open && "rotate-180"
                    } ${submenuOpen && "text-sm"}`}
                    onClick={() => {
                      setSubmenuOpen(!submenuOpen);
                    }}
                  />
                )}
              </li>

              {menu.submenu && submenuOpen && open && (
                <ul>
                  {menu.submenuItems?.map((submenuItem, index) => (
                    <li
                      key={submenuItem.title}
                      className={`text-Gray-mine-shaft text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-[#ffe8b3] rounded-md`}
                    >
                      <span className={`text-2xl block float-left`}>
                        {submenuItem.icon && submenuItem.icon}
                      </span>
                      <Link
                        href={`${
                          submenuItem.href
                            ? submenuItem.href
                            : (submenuItem.href = "")
                        }`}
                        passHref
                      >
                        <span
                          className={`text-base text-Gray-mine-shaft font-medium flex-1 duration-300 ${
                            !open && "hidden"
                          }`}
                        >
                          {submenuItem.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
