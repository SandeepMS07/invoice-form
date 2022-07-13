import { useState } from "react";

const ModifyDetails = (props: any) => {
  const { data } = props;
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isDisabled, setisDisabled] = useState({
    name: true,
    phone: true,
    email: true,
  });

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);

  return (
    <div className="m-1 md:m-3 mr-1 md:ml-6 mt-4  ">
      {data && (
        <div>
          <table className="w-full divide-y border-2 divide-border table-auto">
            <tbody className="bg-white divide-y w-full">
              <tr className="flex flex-col md:flex-row">
                <td className="md:py-4 px-4 md:w-1/5 mb-1 md:mb-0 mt-2 md:mt-1 text-sm font-semibold text-black whitespace-normal">
                  Name:
                </td>
                <td className="md:py-4 px-4 md:w-2/5 text-sm font-semibold text-black whitespace-normal ">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="border-2 border-border rounded-sm p-1 px-6 focus:outline-green-600"
                    value={isDisabled.name ? data.name : values.name}
                    readOnly={isDisabled.name}
                    placeholder="enter here"
                    onChange={handleChange}
                  />
                </td>
                <td className="flex flex-row items-center justify-end gap-x-4 md:py-4 px-4 md:w-2/5 mt-3 md:mt-0 mb-2 md:mb-0 text-sm font-semibold text-black whitespace-normal ">
                  <button
                    className={`border-2 px-4 py-1  text-white ${isDisabled.name ? "bg-[#0e69a2]" : "bg-orange-600"}`}
                    onClick={() => {
                      setisDisabled({ ...isDisabled, name: !isDisabled.name });
                    }}
                  >
                    {isDisabled.name? "Edit" : "Cancel"}
                  </button>
                  <button className="border-2 px-4 py-1 bg-[#f5b55b] text-white">
                    Update
                  </button>
                </td>
              </tr>

              <tr className="flex flex-col md:flex-row">
                <td className="md:py-4 px-4 md:w-1/5 mb-1 md:mb-0 mt-2 md:mt-1 text-sm font-semibold text-black whitespace-normal ">
                  Phone number:
                </td>

                <td className="md:py-4 px-4 md:w-2/5 text-sm font-semibold text-black whitespace-normal ">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="border-2 border-border rounded-sm p-1 px-6 focus:outline-green-600"
                    value={isDisabled.phone ? data.phone_number : values.phone}
                    readOnly={isDisabled.phone}
                    placeholder="enter here"
                    onChange={handleChange}
                  />
                </td>

                <td className="flex flex-row items-center justify-end gap-x-4 md:py-4 px-4 md:w-2/5 mt-3 md:mt-0 mb-2 md:mb-0 text-sm font-semibold text-black whitespace-normal ">
                  <button
                    className={`border-2 px-4 py-1  text-white ${isDisabled.phone ? "bg-[#0e69a2]" : "bg-orange-600"}`}
                    onClick={() => {
                      setisDisabled({
                        ...isDisabled,
                        phone: !isDisabled.phone,
                      });
                    }}
                  >
                    {isDisabled.phone? "Edit" : "Cancel"}
                  </button>
                  <button className="border-2 px-4 py-1 bg-[#f5b55b] text-white">
                    Update
                  </button>
                </td>
              </tr>
              <tr className="flex flex-col md:flex-row">
                <td className="md:py-4 px-4 md:w-1/5 mb-1 md:mb-0 mt-2 md:mt-1 text-sm font-semibold text-black whitespace-normal ">
                  Email:
                </td>
                <td className="md:py-4 px-4 md:w-2/5 text-sm font-semibold text-black whitespace-normal ">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="border-2 border-border rounded-sm p-1 px-6 focus:outline-green-600"
                    value={isDisabled.email ? data.email : values.email}
                    readOnly={isDisabled.email}
                    placeholder="enter here"
                    onChange={handleChange}
                  />
                </td>

                <td className="flex flex-row items-center justify-end gap-x-4 md:py-4 px-4 md:w-2/5 mt-3 md:mt-0 mb-2 md:mb-0 text-sm font-semibold text-black whitespace-normal ">
                  <button
                    className={`border-2 px-4 py-1  text-white ${isDisabled.email ? "bg-[#0e69a2]" : "bg-orange-600"}`}
                    onClick={() => {
                      setisDisabled({
                        ...isDisabled,
                        email: !isDisabled.email,
                      });
                    }}
                  >
                    {isDisabled.email? "Edit" : "Cancel"}
                  </button>
                  <button className="border-2 px-4 py-1 bg-[#f5b55b] text-white">
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ModifyDetails;
