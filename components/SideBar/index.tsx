import { useState } from "react";
import {
  BsArrowLeftShort,
  BsPerson,
  BsReverseLayoutTextSidebarReverse,
  BsFillImageFill,
  BsChevronDown,
  BsSearch,
} from "react-icons/bs";
import { AiFillEnvironment } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import {
  AiOutlineFileText,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineBarChart,
  AiOutlineMail,
} from "react-icons/ai";
import { TiClipboard } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const Menus = [
    { title: "Dashboard", href: "/" },
    {
      title: "Invoice",
      icon: <TiClipboard />,
      href: "/CustomerSupport/Invoice",
    },
    { title: "Media", spacing: true, icon: <BsFillImageFill /> },
    {
      title: "Projects",
      icon: <BsReverseLayoutTextSidebarReverse />,
      submenu: true,
      submenuItems: [
        { title: "Submenu 1 " },
        { title: "Submenu 2 " },
        { title: "Submenu 3 " },
      ],
    },
    { title: "Analytics", icon: <AiOutlineBarChart /> },
    { title: "Inbox", icon: <AiOutlineMail /> },
    { title: "Media", spacing: true, icon: <BsPerson /> },
    { title: "Settings", icon: <AiOutlineSetting /> },
    { title: "Logout", icon: <AiOutlineLogout /> },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-bg-light h-screen p-5 pt-8 ${
          open ? "w-60" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border z-[900] border-dark-purple cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => {
            setOpen(!open);
          }}
        />
        <Link href="/" passHref>
          <div className="inline-flex">
            <Image
              src="/assets/images/img.png"
              alt=""
              height={`${!open ? "40px" : "40px"}`}
              width={`${!open ? "40px" : "40px"}`}
              className={` mr-2 duration-500 text-4xl rounded cursor-pointer block float-left ${
                !open && "rotate-[360deg]"
              }`}
            />
            {/* <AiFillEnvironment
              className={`bg-amber-300 mr-2 duration-500 text-4xl rounded cursor-pointer block float-left ${
                !open && "rotate-[360deg]"
              }`}
            /> */}
            <h1
              className={`text-Gray-mine-shaft origin-left ml-2 font-bold text-2xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Darwin
            </h1>
          </div>
        </Link>

        <div
          className={`flex items-center rounded-md bg-light-white mt-6 px-4 py-2 ${
            open && "mr-2"
          }`}
        >
          <BsSearch
            className={`text-Gray-mine-shaft text-lg block float-left cursor-pointer mr-2}`}
          />
          <input
            type={"search"}
            placeholder="Search"
            className={` text-base bg-transparent w-full text-Gray-mine-shaft focus:outline-none ${
              !open && "hidden"
            }}`}
          />
        </div>
        <ul>
          {Menus.map((menu, index) => (
            <>
              <Link href={`${menu.href && menu.href}`} passHref>
                <li
                  key={index}
                  className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-bg-light rounded-md ${
                    menu.spacing ? "mt-9" : "mt-2"
                  }`}
                >
                  <span className={`text-2xl block float-left`}>
                    {menu.icon ? menu.icon : <RiDashboardFill />}
                  </span>
                  <span
                    className={`text-base font-medium flex-1 duration-300 ${
                      !open && "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                  {menu.submenu && (
                    <BsChevronDown
                      className={`${submenuOpen && open && "rotate-180"}`}
                      onClick={() => {
                        setSubmenuOpen(!submenuOpen);
                      }}
                    />
                  )}
                </li>
              </Link>

              {menu.submenu && submenuOpen && open && (
                <ul>
                  {menu.submenuItems?.map((submenuItem, index) => (
                    <li
                      key={index}
                      className={`text-Gray-mine-shaft text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-Gray-mine-shaft rounded-md`}
                    >
                      {submenuItem.title}
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
