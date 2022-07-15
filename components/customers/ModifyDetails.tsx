import axios from "axios";
import Link from "next/link";
import { useState } from "react";

import { RiPencilFill } from "react-icons/ri";
import SearchButton from "../Buttons/searchButton";
import Table from "../table/table";
const ModifyDetails = (props: any) => {
  // const { data } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState();

  const onSubmit = (e: any) => {
    e.preventDefault();
    axios({
      method: "get",
      // url: `https://nl-ns-apim-ds.azure-api.net/dev-darwin-lc/v1/customerSupport/getAddExtentiondata/${searchKey}`,
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
    // setSearchKey(e.target.value);
  };

  const handleOptions = (e: any) => {
    // setCustomers(e.target.value);
    setIsChecked(true);
  };

  return (
    <div className="m-1 md:m-3 mr-1 md:ml-6 mt-4  ">
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
                  <Link
                    passHref
                    href={{
                      pathname:
                        "../../../components/customers/ModifyDetails.tsx",
                    }}
                  >
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
                  </Link>
                </div>
              </div>
            </div>
            <div className=" md:w-7/12 h-[685px] border-2 m-4">
              {/* <main>{children}</main> */}

              {/* <Layout>
          <Component {...pageProps} />
        </Layout> */}

              {/* <ModifyDetails data={data} /> */}
            </div>
          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default ModifyDetails;
