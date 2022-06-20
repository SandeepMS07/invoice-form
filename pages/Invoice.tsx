import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import { reset, update } from "../redux/userSlice";

const Invoice: NextPage = () => {
  interface values {
    name: string;
    email: any;
    phone: number;
    student_id: string;
    learncab_id: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    gst_number: string;
    payment_id: string;
    date: string;
  }

  let [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    student_id: "",
    learncab_id: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    gst_number: "",
    payment_id: "",
    date: "",
  });

  const [phoneRes, setPhoneRes] = useState({});

  /**
   * fetching student ID from API
   */
  async function fetchData() {
    try {
      let url = `https://nl-ns-apim-ds.azure-api.net/dev-darwin-lc/v1/customerSupport/getAddExtentiondata/${values.phone}`;
      const res: any = await axios({
        method: "GET",
        url: url,
        headers: {
          "Ocp-Apim-Subscription-Key": "23835e387fda4748b2aed408f9e90e8c",
        },
      });

      setPhoneRes(res.data.data[0].phone_number);
      setValues({
        ...values,
        student_id: res.data.data[0]._id,
        learncab_id: res.data.data[0].student_id,
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (values.phone.length == 10) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.phone]);

  interface itemList {
    description: string;
    price: number;
    amount_paid: number;
    plan_code: string;
    days: number;
    discount: string;
  }
  [];
  let [itemList, setItemList] = useState([
    {
      description: "",
      price: "",
      amount_paid: "",
      plan_code: "",
      days: "",
      discount: "",
    },
  ]);

  const [error, setError] = useState({
    name: {
      error: false,
      message: "",
    },
    email: {
      error: false,
      message: "",
    },
    phone: {
      error: false,
      message: "",
    },
    student_id: {
      error: false,
      message: "",
    },
    learncab_id: {
      error: false,
      message: "",
    },
    address: {
      error: false,
      message: "",
    },
    city: {
      error: false,
      message: "",
    },
    state: {
      error: false,
      message: "",
    },
    pincode: {
      error: false,
      message: "",
    },
    country: {
      error: false,
      message: "",
    },
    gst_number: {
      error: false,
      message: "",
    },
    payment_id: {
      error: false,
      message: "",
    },
    date: {
      error: false,
      message: "",
    },
  });
  const [itemListError, setItemListError] = useState({
    description: {
      error: false,
      message: "",
      index: [],
    },
    price: {
      error: false,
      message: "",
      index: [],
    },
    amount_paid: {
      error: false,
      message: "",
      index: [],
    },
    plan_code: {
      error: false,
      message: "",
      index: [],
    },
    days: {
      error: false,
      message: "",
      index: [],
    },
    discount: {
      error: false,
      message: "",
      index: [],
    },
  });
  let [pdf, setPdf] = useState();

  const dispatch = useDispatch();
  const Name: string = useSelector((state: any) => state.detail.name);
  const Email: string = useSelector((state: any) => state.detail.email);
  const Phone: number = useSelector((state: any) => state.detail.phone);
  const StudentId: string = useSelector(
    (state: any) => state.detail.student_id
  );
  const LearncabId: string = useSelector(
    (state: any) => state.detail.learncab_id
  );
  const Address: string = useSelector((state: any) => state.detail.address);
  const City: string = useSelector((state: any) => state.detail.city);
  const State: string = useSelector((state: any) => state.detail.state);
  const Pincode: string = useSelector((state: any) => state.detail.pincode);
  const Country: string = useSelector((state: any) => state.detail.country);
  const GSTNo: string = useSelector((state: any) => state.detail.gst_number);
  const PaymentId: string = useSelector(
    (state: any) => state.detail.payment_id
  );
  const InvoiceDate: string = useSelector((state: any) => state.detail.date);

  const itemsDetails: any = useSelector((state: any) => state.detail.itemList);

  /**
   *
   * */

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    dispatch(
      update({
        values: values,
        itemList: itemList,
      })
    );

    let details = {
      name: Name,
      email: Email,
      phone: Phone,
      student_id: StudentId,
      learncab_id: LearncabId,
      address: Address,
      city: City,
      state: State,
      pincode: Pincode,
      country: Country,
      gst_number: GSTNo,
      payment_id: PaymentId,
      invoice_date: InvoiceDate,
      items: itemsDetails,
    };

    let apiUrl = "http://localhost:8000/invoy/api/v1/invoice/generateInvoice";

    axios({
      method: "post",
      url: apiUrl,
      data: details,
      headers: { "Content-Type": "application/Json" },
    })
      .then((response) => {
        let urldata = response.data.fileurl;

        // Array.from(document.querySelectorAll("input")).forEach(
        //   (input) => (input.value = "")
        // );

        setPdf(urldata);
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });
  }

  const handleChange = (inputValue: any, name: string) => {
    setValues({ ...values, [inputValue.target.name]: inputValue.target.value });

    const { value } = inputValue.target;
  };

  const handleItemChange = (
    e: { target: { name: any; value: any } },
    index: number,
    inpName: string
  ) => {
    const { name, value } = e.target;
    const updatedItems = itemList.map((item, i) => {
      if (index === i) {
        return { ...item, [name]: value };
      } else {
        return item;
      }
    });
    setItemList(updatedItems);
  };
  const handleaddclick = () => {
    setItemList([
      ...itemList,
      {
        description: "",
        price: "",
        amount_paid: "",
        plan_code: "",
        days: "",
        discount: "",
      },
    ]);
  };

  const handleremove = (index: any) => {
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
  };

  return (
    <div>
      <Head>
        <title>Invoice</title>
      </Head>
      <header className="bg-darkViolet sticky top-0 h-[72px] hidden md:flex  justify-between items-center drop-shadow-xl z-50">
        <p className="ml-8 mr-8 text-white font-semibold uppercase">Invoice</p>
      </header>
      <div className="grid lg:grid-cols-8 md:grid-cols-4 divide-x m-1 border-[1px]">
        <div className="md:col-span-5">
          <div>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col justify-center items-center border-2 md:border-2 m-9 mx-12 md:m-4 p-4"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 w-full">
                {/* {inputs.map((input) => (
                  <div className="md:mr-10" key={input.id}>
                    <Input
                      type={input.type}
                      name={input.name}
                      id={input.id}
                      title={input.title}
                      onChange={handleChange}
                      placeholder={input.placeholder}
                      error={error[input.name]}
                    />
                  </div>
                ))} */}
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    title="Name / Business Name"
                    value={values.name || ""}
                    onChange={(value: any) => handleChange(value, "name")}
                    placeholder="Enter Name"
                    error={error.name}
                  />
                </div>

                <div className="md:mr-10">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    title="Email"
                    value={values.email || ""}
                    onChange={(value: any) => handleChange(value, "email")}
                    placeholder="Enter Email"
                    error={error.email}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="Number"
                    name="phone"
                    id="phone"
                    title="Phone No"
                    value={values.phone || ""}
                    onChange={(value: any) => handleChange(value, "phone")}
                    placeholder="Enter Phone No"
                    error={error.phone}
                  />
                </div>
                <div className="md:mr-10">
                  <label
                    htmlFor="student_id"
                    className="block text-gray-700 text-xs font-bold mb-1"
                  >
                    Student ID
                  </label>

                  {/*  */}
                  {values.phone == phoneRes ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        name="student_id"
                        value={values.student_id}
                        readOnly
                        id="student_id"
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        name="student_id"
                        value={values.student_id || ""}
                        onChange={(value: any) =>
                          handleChange(value, "student_id")
                        }
                        id="student_id"
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                      />
                      <p className="text-red-600 text-xs mb-2">
                        {error.student_id.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:mr-10">
                  <label
                    htmlFor="student_id"
                    className="block text-gray-700 text-xs font-bold mb-1"
                  >
                    Learncab ID
                  </label>

                  {/*  */}
                  {values.phone == phoneRes ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        name="learncab_id"
                        value={values.learncab_id}
                        readOnly
                        id="learncab_id"
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        name="learncab_id"
                        value={values.learncab_id || ""}
                        onChange={(value: any) =>
                          handleChange(value, "learncab_id")
                        }
                        id="learncab_id"
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                      />
                      <p className="text-red-600 text-xs mb-2">
                        {error.learncab_id.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    title="Address"
                    value={values.address || ""}
                    onChange={(value: any) => handleChange(value, "address")}
                    placeholder="Enter Address"
                    error={error.address}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    title="City"
                    value={values.city || ""}
                    onChange={(value: any) => handleChange(value, "city")}
                    placeholder="Enter City"
                    error={error.city}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    title="State"
                    value={values.state || ""}
                    onChange={(value: any) => handleChange(value, "state")}
                    placeholder="Enter State"
                    error={error.state}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="pincode"
                    id="pincode"
                    title="Pincode"
                    value={values.pincode || ""}
                    onChange={(value: any) => handleChange(value, "pincode")}
                    placeholder="Enter Pincode"
                    error={error.pincode}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    title="Country"
                    value={values.country || ""}
                    onChange={(value: any) => handleChange(value, "country")}
                    placeholder="Enter Country"
                    error={error.country}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="gst_number"
                    id="gst_number"
                    title="GST Number"
                    value={values.gst_number || ""}
                    onChange={(value: any) => handleChange(value, "gst_number")}
                    placeholder="Enter GST Number"
                    error={error.gst_number}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    name="payment_id"
                    id="payment_id"
                    title="Payment ID"
                    value={values.payment_id || ""}
                    onChange={(value: any) => handleChange(value, "payment_id")}
                    placeholder="Enter Payment ID"
                    error={error.payment_id}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="Date"
                    name="date"
                    id="date"
                    title="Date"
                    value={values.date || ""}
                    onChange={(value: any) => handleChange(value, "date")}
                    placeholder="Enter Date"
                    error={error.date}
                  />
                </div>
              </div>
              <div className="border-[1px] w-full bg-gray-200 border-gray-200 inline-block mb-2 drop-shadow-xl"></div>

              {/**
               * Items
               */}

              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="block text-gray-700 text-sm font-bold"
                >
                  Items:
                </label>
                {itemList.map((x, i) => {
                  return (
                    <div key={i}>
                      <div className="border-[1px] w-full mt-1 bg-gray-200  border-gray-200 inline-block mb-1 drop-shadow-xl"></div>
                      <div>
                        <div className="grid md:grid-cols-3">
                          <div className="md:mr-10">
                            <Input
                              type="text"
                              name="description"
                              id="description"
                              title="Description"
                              placeholder="Enter Description"
                              value={itemList[0].description || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, i, "description")
                              }
                              error={itemListError.description}
                              index={i}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              name="price"
                              id="price"
                              title="Price"
                              placeholder="Enter Price"
                              onChange={(value: any) =>
                                handleItemChange(value, i, "price")
                              }
                              value={itemList[0].price || ""}
                              error={itemListError.price}
                              index={i}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              name="amount_paid"
                              id="amount_paid"
                              title="Amount Paid"
                              placeholder="Enter Amount Paid"
                              value={itemList[0].amount_paid || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, i, "amount_paid")
                              }
                              error={itemListError.amount_paid}
                              index={i}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="string"
                              name="plan_code"
                              id="plan_code"
                              title="Plan Code"
                              placeholder="Enter Plan Code"
                              value={itemList[0].plan_code || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, i, "plan_code")
                              }
                              error={itemListError.plan_code}
                              index={i}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              name="days"
                              id="days"
                              title="Days"
                              placeholder="Enter Days"
                              value={itemList[0].days || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, i, "days")
                              }
                              error={itemListError.days}
                              index={i}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="string"
                              name="discount"
                              id="discount"
                              title="Discount"
                              placeholder="Enter Discount"
                              value={itemList[0].discount || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, i, "discount")
                              }
                              error={itemListError.discount}
                              index={i}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end items-center mr-6">
                          <div>
                            {itemList.length !== 1 && (
                              <button
                                className="m-4 w-20 py-2 text-xs text-white rounded bg-red-600 hover:bg-red-500 border-red-500 hover:text-white"
                                onClick={() => handleremove(i)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <div>
                            {itemList.length - 1 === i && (
                              <button
                                className="m-4 w-20 py-2 text-xs text-white rounded bg-darkViolet hover:bg-blue-800 hover:text-white"
                                onClick={handleaddclick}
                              >
                                Add Items
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-[1px] w-full mt-4 bg-gray-200  border-gray-200 inline-block mb-1 drop-shadow-xl"></div>
              <div className="flex flex-row">
                <button
                  type="submit"
                  // onClick={(e) => {
                  //   Array.from(document.querySelectorAll("input")).forEach(
                  //     (input) => (input.value = "")
                  //   );
                  //   setValues([{}]);
                  //   setItemList([{}]);
                  // }}
                  className="m-4 w-20 py-1 text-center text-white rounded  bg-darkViolet  disabled:opacity-40 disabled:bg-red-600  hover:bg-blue-800 hover:text-white"
                >
                  Submit
                </button>

                <button
                  type="reset"
                  className="m-4 w-20 py-1 text-center text-white rounded bg-darkViolet hover:bg-blue-800 hover:text-white"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   dispatch(reset());

                  //   Array.from(document.querySelectorAll("input")).forEach(
                  //     (input) => (input.value = "")
                  //   );
                  //   setValues([{}]);
                  //   setItemList([{}]);
                  // }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col items-center justify-center  md:w-[670px]  lg:w-auto min-h-[600px] border-2 m-4 bg-gray-300">
            <object
              data={pdf}
              type="application/pdf"
              className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[440px] lg:h-[650px]"
            >
              <p className="text-center">
                Alternative text - include a link{" "}
                <a className="text-darkViolet font-bold underline" href={pdf}>
                  to the PDF!
                </a>
              </p>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
