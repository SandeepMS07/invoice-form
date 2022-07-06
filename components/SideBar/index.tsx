import { useState } from "react";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";

import { TiClipboard } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
const Sidebar = ({ nav }: any) => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const router = useRouter();
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
    <div>
      <div className="md:flex md:flex-col h-screen hidden bg-bg-light border-r-[1px] border-[#cc8f00] ">
        <div
          className={`h-[93%] p-5 pt-8 ${
            open ? "w-60" : "w-20"
          } duration-300 relative`}
        >
          <BsArrowLeftShort
            className={`absolute  -right-3 top-9 border z-[900] bg-white text-text text-3xl rounded-full  border-[#cc8f00] cursor-pointer ${
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

              {open && (
                <h1
                  className={`text-Gray-mine-shaft origin-left ml-2 font-bold  text-2xl duration-200 ${
                    !open && "scale-0"
                  }`}
                >
                  Darwin
                </h1>
              )}
            </div>
          </Link>

          <ul>
            {Menus.map((menu, index) => (
              <>
                <li
                  key={index}
                  className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#ffe8b3] rounded-md  
                   mt-3  ${router.asPath === menu.href && "bg-[#ffd980]"}
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
                      className={`text-base text-Gray-mine-shaft font-medium flex-1 ease-in-out delay-150 pb-2 duration-300 ${
                        !open && "hidden"
                      }`}
                      onClick={() => {
                        menu.submenu && setSubmenuOpen(!submenuOpen);
                      }}
                    >
                      {menu.title}
                    </span>
                  </Link>

                  {menu.submenu && (
                    <BsChevronDown
                      className={`text-Gray-mine-shaft ${
                        submenuOpen && open && "rotate-180"
                      } ${submenuOpen && "text-sm"} ${!open && "hidden"}`}
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
                        className={`text-Gray-mine-shaft text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-[#ffe8b3] rounded-md ${
                          router.asPath === submenuItem.href && "bg-[#ffd980]"
                        }`}
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
                            }  `}
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

        {/**
         *logout
         *   */}

        <div
          className={`flex h-[7%] mt-[37px] ${
            open ? "w-60" : "w-20"
          } duration-300 relative bg-[#ff5722] px-3 py-4  overflow-hidden whitespace-nowrap`}
        >
          <div className="flex items-center justify-center w-full">
            <span
              className={`w-2/12 text-base text-Gray-mine-shaft  ease-in-out delay-150  duration-300 ${
                !open && "hidden"
              }`}
            >
              <p className="text-text rounded-[47%] bg-white text-center items-center justify-center font-bold">
                A
              </p>
            </span>
            <span
              className={` w-8/12 text-base text-Gray-mine-shaft font-medium ease-in-out delay-150  duration-300 ${
                !open && "hidden"
              }`}
            >
              <p className="text-white ml-5">Alfred David</p>
            </span>
            <span
              className={`${
                open ? "w-2/12" : "w-full"
              } w-2/12 text-2xl block float-left ease-in-out duration-300`}
              onClick={() => {
                !open && setOpen(!open);
              }}
            >
              <Image
                src="/assets/images/logout.png"
                alt=""
                height={"30px"}
                width={"30px"}
                className={`mr-2 duration-500 text-4xl rounded cursor-pointer block float-left"
              }`}
              />
            </span>
          </div>
        </div>
      </div>

      {/**
       * MobNav
       */}

      <div
        className={
          !nav
            ? "hidden"
            : "absolute bg-bg-light w-60 px-8 border-r-[1px] border-[#cc8f00]"
        }
      >
        <div
          className={`h-[93%] p-5 pt-8 ${
            open ? "w-60" : "w-20"
          } duration-300 relative`}
        >
          <ul>
            {Menus.map((menu, index) => (
              <>
                <li
                  key={index}
                  className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#ffe8b3] rounded-md  
                   mt-3  ${router.asPath === menu.href && "bg-[#ffd980]"}
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
                      className={`text-base text-Gray-mine-shaft font-medium flex-1 ease-in-out delay-150 pb-2 duration-300 ${
                        !open && "hidden"
                      }`}
                      onClick={() => {
                        menu.submenu && setSubmenuOpen(!submenuOpen);
                      }}
                    >
                      {menu.title}
                    </span>
                  </Link>

                  {menu.submenu && (
                    <BsChevronDown
                      className={`text-Gray-mine-shaft ${
                        submenuOpen && open && "rotate-180"
                      } ${submenuOpen && "text-sm"} ${!open && "hidden"}`}
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
                        className={`text-Gray-mine-shaft text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-[#ffe8b3] rounded-md ${
                          router.asPath === submenuItem.href && "bg-[#ffd980]"
                        }`}
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
                            }  `}
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

        {/**
         *logout
         *   */}

        <div
          className={`flex h-[7%] mt-[37px] ${
            open ? "w-60" : "w-20"
          } duration-300 relative bg-[#ff5722] px-3 py-4  overflow-hidden whitespace-nowrap`}
        >
          <div className="flex items-center justify-center w-full">
            <span
              className={`w-2/12 text-base text-Gray-mine-shaft  ease-in-out delay-150  duration-300 ${
                !open && "hidden"
              }`}
            >
              <p className="text-text rounded-[47%] bg-white text-center items-center justify-center font-bold">
                A
              </p>
            </span>
            <span
              className={` w-8/12 text-base text-Gray-mine-shaft font-medium ease-in-out delay-150  duration-300 ${
                !open && "hidden"
              }`}
            >
              <p className="text-white ml-5">Alfred David</p>
            </span>
            <span
              className={`${
                open ? "w-2/12" : "w-full"
              } w-2/12 text-2xl block float-left ease-in-out duration-300`}
              onClick={() => {
                !open && setOpen(!open);
              }}
            >
              <Image
                src="/assets/images/logout.png"
                alt=""
                height={"30px"}
                width={"30px"}
                className={`mr-2 duration-500 text-4xl rounded cursor-pointer block float-left"
              }`}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
