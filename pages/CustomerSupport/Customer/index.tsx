/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import SearchButton from "../../../components/Buttons/searchButton";
import Table from "../../../components/table/table";

const index = () => {
  const [searchKey, setSearchKey] = useState();
  const [data, setData] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [customers, setCustomers] = useState()

  const onSubmit = (e: any) => {
    e.preventDefault();
    axios({
      method: "get",
      url: `https://nl-ns-apim-ds.azure-api.net/dev-darwin-lc/v1/customerSupport/getAddExtentiondata/${searchKey}`,
      headers: {
        "Ocp-Apim-Subscription-Key": "23835e387fda4748b2aed408f9e90e8c",
      },
    })
      .then((response) => {
        let urldata = response.data;
        console.log(urldata.data[0].course_level);
        setData(urldata.data[0]);
      })
      .catch((response) => {
        console.log(response);
      });
  };

  const onChange = (e: any) => {
    setSearchKey(e.target.value);
  };

  const handleRadioButton = (e: any) => {
    setCustomers(e.target.value)
    setIsChecked(true);
  };

  const details = [
    { value: "modifyDetails", title: "Modify Details" },
    { value: "resetPassword", title: "Reset Password" },
    { value: "refundCredit", title: "Refund Credit" },
    { value: "addExtension", title: "Add Extension" },
    { value: "otpVerify", title: "OTP Verification" },
  ];

  return (
    <div className="h-screen">
      <Head>
        <title>Customers</title>
      </Head>
      <header className="h-[70px] bg-[#f2f2f2] sticky top-0 border-b-2 hidden md:flex items-center justify-start z-50">
        <p className="text-2xl font-bold ml-10">Customers</p>
      </header>
      {/* <div className="h-[100%] overflow-hidden"> */}
      <div className="h-[120px] border-b-[1px] w-full">
        <form action="">
          {/**
           * radio button
           *   */}
          <div className="hidden md:flex flex-wrap ml-10 mt-5 w-2/3 gap-x-28">
            {details.map((inp, index) => {
              return (
                <div className="mb-8" key={index}>
                  <input
                    type="radio"
                    name="customers"
                    id={inp.value}
                    value={inp.title}
                    className="accent-[#ff5722] ring-border transition duration-400"
                    checked={customers === inp.title}
                    onChange={handleRadioButton}
                  />
                  <label
                    htmlFor={inp.value}
                    className="text-lg font-semibold ml-4"
                  >
                    {inp.title}
                  </label>
                </div>
              );
            })}
          </div>

          {/**
           *dropdown list [mobile]
           *   */}

          <div className="md:hidden flex flex-col m-4 ">
            <label
              htmlFor="customers"
              className="block text-xl font-semibold text-black mb-4"
            >
              Customers
            </label>
            <select
              name="customers"
              id="customers"
              autoComplete="customers"
              className="border-2 border-border outline-none rounded-sm p-2 text-sm font-semibold"
            >
              <option
                value="Modify Details"
                className="bg-white focus:bg-[#f2f2f2] text-sm font-semibold"
              >
                Modify Details
              </option>
              <option
                value="Reset Password"
                className="bg-white focus:bg-[#f2f2f2] text-sm font-semibold"
              >
                Reset Password
              </option>
              <option
                value="Refund Credit"
                className="bg-white focus:bg-[#f2f2f2] text-sm font-semibold"
              >
                Refund Credit
              </option>
              <option
                value="Add Extension"
                className="bg-white focus:bg-[#f2f2f2] text-sm font-semibold"
              >
                Add Extension
              </option>
              <option
                value="OTP Verification"
                className="bg-white focus:bg-[#f2f2f2] text-sm font-semibold"
              >
                OTP Verification
              </option>
            </select>
          </div>
        </form>
      </div>

      {/**
       *
       */}
      {isChecked && (
        <div className="h-[585px] w-full">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-5/12">
              <SearchButton onSubmit={onSubmit} onChange={onChange} />
              <div>
                <div className="m-1 md:m-3 mr-1 md:ml-6 mt-4  ">
                  {/* <div className="w-full h-[482px] border-2 shadow-lg"> */}
                  <Table data={data} />
                  {/* </div> */}
                </div>
                <div className="flex items-end justify-end mt-6">
                  <button className="px-3 mb-4 md:px-5 py-1 md:py-2 bg-[#0060ef] border-2 rounded-sm border-[#043785] text-white font-semibold mr-6">
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
            <div className=" md:w-7/12 h-[685px] border-2 m-4">
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
      )}
    </div>
  );
};

export default index;
