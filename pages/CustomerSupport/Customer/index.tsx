import Head from "next/head";
import { AiOutlineSearch } from "react-icons/ai";
import {RiPencilFill} from "react-icons/ri"

const index = () => {
  return (
    <div className="h-screen">
      <Head>
        <title>Customers</title>
      </Head>
      <header className="h-[70px] bg-[#f2f2f2] sticky top-0 border-b-2 flex items-center justify-start z-50">
        <p className="text-2xl font-bold ml-10">Customers</p>
      </header>
      {/* <div className="h-[100%] overflow-hidden"> */}
      <div className="h-[120px] border-b-[1px] w-full">
        <form action="">
          <div className="flex flex-wrap ml-10 mt-5 w-2/3 gap-x-28">
            <div className="mb-8">
              <input
                type="radio"
                name="customers"
                id="modifyDetails"
                className="accent-[#ff5722] ring-border transition duration-400"
              />
              <label
                htmlFor="modifyDetails"
                className="text-lg font-semibold ml-4"
              >
                Modify Details
              </label>
            </div>
            <div className="mb-8">
              <input
                type="radio"
                name="customers"
                id="resetPassword"
                className="accent-[#ff5722] ring-border transition duration-400"
              />
              <label
                htmlFor="resetPassword"
                className="text-lg font-semibold ml-4"
              >
                Reset Password
              </label>
            </div>
            <div className="mb-8">
              <input
                type="radio"
                name="customers"
                id="refundCredit"
                className="accent-[#ff5722] ring-border transition duration-400"
              />
              <label
                htmlFor="refundCredit"
                className="text-lg font-semibold ml-4"
              >
                Refund Credit
              </label>
            </div>
            <div className="mb-8">
              <input
                type="radio"
                name="customers"
                id="addExtension"
                className="accent-[#ff5722] ring-border transition duration-400"
              />
              <label
                htmlFor="addExtension"
                className="text-lg font-semibold ml-4"
              >
                Add Extension
              </label>
            </div>
            <div className="mb-8">
              <input
                type="radio"
                name="customers"
                id="otpVerify"
                className="accent-[#ff5722] ring-border transition duration-400"
              />
              <label htmlFor="otpVerify" className="text-lg font-semibold ml-4">
                OTP Verification
              </label>
            </div>
          </div>
        </form>
      </div>

      {/**
       *
       */}

      <div className="h-[585px] w-full">
        <div className="flex flex-row">
          <div className="w-5/12">
            <div className="w-full">
              <form className="border-2 h-14 ml-10 mt-4 m-4 flex">
                <input
                  className="p-4 w-[65%] border-t mr-0 text-sm outline-none border-gray-200 bg-white"
                  placeholder="Enter email/Phone number"
                />
                <button className="w-[35%] bg-[#ff5722] font-bold border-2 border-[#b52b00]">
                  <span className="flex flex-row items-center justify-center gap-x-2">
                    <span className="">
                      <AiOutlineSearch className="text-white text-2xl" />
                    </span>
                    <span className="text-white text-lg font-semibold mb-[2px]">
                      Search
                    </span>
                  </span>
                </button>
              </form>
            </div>
            <div>
              <div className="m-3 mr-1 ml-6 mt-4">
                <table className="w-full h-[482px] border-2 divide-y divide-border table-fixed shadow-lg">
                  <tbody className="bg-white divide-y w-full">
                    <tr className="">
                      <td className="py-4 px-10 w-2/5 text-[16px] font-semibold text-black whitespace-nowrap ">
                        Full Name :
                      </td>
                      <td className="py-4 px-1 w-3/5 text-sm font-sm text-[#666666] whitespace-nowrap">
                        Vibhakar Acharya
                      </td>
                    </tr>
                    <tr className="">
                      <td className="py-4 px-10 w-2/5 text-[16px] font-semibold text-black whitespace-nowrap">
                        Email :
                      </td>
                      <td className="py-4 px-1  w-3/5 text-sm font-sm text-[#666666] whitespace-nowrap">
                        vibhakar.acharya@gmail.com
                      </td>
                    </tr>
                    <tr className="">
                      <td className="py-4 px-10 w-2/5 text-[16px] font-semibold text-black whitespace-nowrap">
                        Phone Number :
                      </td>
                      <td className="py-4 px-1 w-2/3 text-sm font-sm text-[#666666] whitespace-nowrap">
                        9916965096
                      </td>
                    </tr>
                    <tr className="">
                      <td className="py-4 px-10 w-2/5 text-[16px] font-semibold text-black whitespace-nowrap">
                        Course Level :
                      </td>
                      <td className="py-4 px-1 w-3/5 text-sm font-sm text-[#666666] whitespace-nowrap">
                        CA Final - New Syllabus
                      </td>
                    </tr>
                    <tr className="">
                      <td className="py-4 px-10 w-2/5 text-[16px] font-semibold text-black whitespace-nowrap">
                        Total Credits :
                      </td>
                      <td className="py-4 px-1 w-3/5 text-sm font-sm text-[#666666] whitespace-nowrap">
                        5
                      </td>
                    </tr>
                    <tr className="">
                      <td className="py-4 px-10 w-2/5 text-[16px] font-semibold text-black whitespace-nowrap">
                        Credits Used :
                      </td>
                      <td className="py-4 px-1 w-3/5 text-sm font-sm text-[#666666] whitespace-nowrap">
                        3
                      </td>
                    </tr>
                    <tr className="">
                      <td className="py-4 px-10 w-2/5 text-[16px] font-semibold text-black whitespace-nowrap">
                        Pack Expiry :
                      </td>
                      <td className="py-4 px-1 w-3/5 text-sm font-sm text-[#666666] whitespace-nowrap">
                        07-07-2022
                      </td>
                    </tr>
                    <tr className="">
                      <td className="py-4 px-10 w-1/3 text-[16px] font-semibold text-black whitespace-nowrap">
                        Status :
                      </td>
                      <td className="py-4 px-1 w-3/5 text-sm font-sm text-[#666666] whitespace-nowrap">
                        Expired
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-end justify-end mt-6">
                <button className="px-5 py-2 bg-[#0060ef] border-2 rounded-sm border-[#043785] text-white font-semibold mr-6">
                  <span className="flex flex-row items-center justify-center gap-x-2">
                    <span className="">
                      <RiPencilFill className="text-white text-2xl" />
                    </span>
                    <span className="text-white text-lg font-semibold mb-[2px]">
                    Modify
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-7/12 h-[685px] border-2 m-4">
            <div></div>
            <div>
              <div className="absolute bottom-[60px] right-10">
                {/* <button className="px-7 py-3 bg-[#5c685c] border-2 rounded-sm border-[#3c3c3c] text-white font-semibold mr-6">
                  Cancel
                </button>
                <button className="px-7 py-3 bg-[#00ab07] border-2 rounded-sm border-[#02720d] text-white font-semibold">
                  Submit
                </button> */}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default index;
