import { useState } from "react";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";
import { TiClipboard } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdOutlineManageAccounts } from "react-icons/md";

const Sidebar = (props: any) => {
  let { nav } = props;
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
          title: "Customers",
          icon: <MdOutlineManageAccounts />,
          href: "/CustomerSupport/Customer",
        },
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
      <div className="md:flex md:flex-col h-screen hidden bg-bg-black border-r-[1px] border-border ">
        <div
          className={`h-[93%] p-5 pt-4 ${
            open ? "w-60" : "w-20"
          } duration-300 relative`}
        >
          <BsArrowLeftShort
            className={`absolute  -right-3 top-[29px] border z-[900] bg-[#fff8e8] text-[#626262] text-3xl rounded-full  border-border cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => {
              setOpen(!open);
            }}
          />
          <Link href="/" passHref>
            <div className="flex gap-x-3 mb-4 mt-2">
              <Image
                src="/assets/images/logo.png"
                alt=""
                height={"50px"}
                width={"49px"}
                className={`duration-500  cursor-pointer ${
                  !open && "rotate-[360deg]"
                }`}
              />

              {open && (
                <h1
                  className={`text-white origin-left ml-2 mt-1 font-bold  text-2xl duration-200 ${
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
              <div key={index}>
                <li
                  className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#00001a] rounded-md  
                   mt-1  ${router.asPath === menu.href && "bg-[#00001a]"}
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
                      className={`text-base text-white font-medium flex-1 ease-in-out delay-150 pb-1 duration-300 ${
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
                      className={`text-white font-bold text-lg mb-1 ${
                        submenuOpen && open && "rotate-180"
                      } ${submenuOpen && "text-sm"} ${!open && "hidden"}`}
                      onClick={() => {
                        setSubmenuOpen(!submenuOpen);
                      }}
                    />
                  )}
                </li>

                {menu.submenu && submenuOpen && open && (
                  <ul className="mb-9">
                    {menu.submenuItems?.map((submenuItem, index) => (
                      <li
                        key={submenuItem.title}
                        className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-7 pl-10 mt-1 mb-2 hover:bg-[#00001a] rounded-md ${
                          router.asPath === submenuItem.href && "bg-[#00001a]"
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
                            className={`text-md text-white font-medium flex-1 duration-300 ${
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
              </div>
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
            <div className="w-2/12 ">
              <span
                className={`bg-white rounded-[100px] w-[30px] h-[30px]  text-base flex items-center justify-center ease-in-out delay-150  duration-300 ${
                  !open && "hidden"
                }`}
              >
                <p className="text-bg-black w-[21px] h-[16px] text-center mb-2 font-bold">
                  AD
                </p>
              </span>
            </div>
            <div
              className={`w-8/12 ease-in-out delay-150  duration-300 ${
                !open && "hidden"
              }`}
            >
              <span className={`text-base text-Gray-mine-shaft font-medium `}>
                <p className="text-white ml-5">Alfred David</p>
              </span>
            </div>
            <div className={`${open ? "w-2/12" : "w-full"}`}>
              <span
                className={`text-xl float-left ease-in-out duration-300`}
                onClick={() => {
                  !open && setOpen(!open);
                }}
              >
                <Image
                  src="/assets/images/logout.png"
                  alt=""
                  height={"32px"}
                  width={"32px"}
                  className={`mr-2 duration-500 text-4xl rounded cursor-pointer block float-left"
              }`}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/**
       * MobNav
       */}

      <div
        className={
          nav
            ? "absolute top-[72px] snap-center overflow-x-hidden bg-bg-black w-screen md:hidden h-screen z-[900] px-8"
            : "hidden"
        }
      >
        <div className={`h-[84%] p-5 pt-8 duration-300 relative`}>
          <ul>
            {Menus.map((menu, index) => (
              <>
                <li
                  key={index}
                  className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#00001a] rounded-md  
                   mt-3  ${router.asPath === menu.href && "bg-[#00001a]"}
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
                    // onClick={() => props.func()}
                  >
                    <span
                      className={`text-base text-white font-medium flex-1 ease-in-out delay-150 pb-2 duration-300 ${
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
                      className={`text-white font-bold text-lg mb-1 ${
                        submenuOpen && open && "rotate-180"
                      } ${submenuOpen && "text-sm"} ${!open && "hidden"}`}
                      onClick={() => {
                        setSubmenuOpen(!submenuOpen);
                      }}
                    />
                  )}
                </li>

                {menu.submenu && submenuOpen && open && (
                  <ul className="mb-9">
                    {menu.submenuItems?.map((submenuItem, index) => (
                      <li
                        key={submenuItem.title}
                        className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-10 mt-2 mb-2 hover:bg-[#00001a] rounded-md ${
                          router.asPath === submenuItem.href && "bg-[#00001a]"
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
                            className={`text-md text-white font-medium flex-1 duration-300 ${
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

        <div className="flex h-[8%] duration-300 relative bg-[#ff5722] px-3 py-4 rounded-sm  overflow-hidden whitespace-nowrap">
          <div className="flex items-center justify-center w-full">
            <div className="w-1/12 ">
              <span className="bg-white rounded-[100px] w-[30px] h-[30px]  text-base flex items-center justify-center">
                <p className="text-bg-black w-[21px] h-[16px] text-center mb-2 font-bold">
                  AD
                </p>
              </span>
            </div>
            <div className="w-8/12">
              <span className="flex items-center justify-start">
                <p className="text-white font-medium text ml-5">Alfred David</p>
              </span>
            </div>
            <div className="w-2/12">
              <span
                className="flex items-center justify-end"
                onClick={() => {
                  !open && setOpen(!open);
                }}
              >
                <Image
                  src="/assets/images/logout.png"
                  alt=""
                  height={"32px"}
                  width={"32px"}
                  className={`mr-2 duration-500 text-4xl rounded cursor-pointer block float-left"
              }`}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="h-[10%]"></div>
      </div>
    </div>
  );
};

export default Sidebar;
