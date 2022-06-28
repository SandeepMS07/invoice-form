import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import { reset, update } from "../redux/userSlice";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import PdfViewer from "../components/PdfViewer";

const Invoice: NextPage = () => {
  type Inputs = {
    name: string;
    email: any;
    phone: string;
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
    items: {
      description: string;
      price: string;
      amount_paid: string;
      plan_code: string;
      days: string;
      discount: string;
    }[];
  };

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
    items: "",
  });

  const schema = Yup.object().shape({
    name: Yup.string().min(5).required("*name required"),
    email: Yup.string()
      .email()
      .required("*description required")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "email should be in form axxxxx@xxxx.com"
      ),
    phone: Yup.string().required("*phone required"),
    student_id: Yup.string().required("*student id required"),
    learncab_id: Yup.string().required("*learncab id required"),
    address: Yup.string().required("*address required"),
    city: Yup.string().required("*city required"),
    state: Yup.string().required("*state required"),
    pincode: Yup.string().required("*pincode required"),
    country: Yup.string().required("*country required"),
    gst_number: Yup.string().notRequired(),
    payment_id: Yup.string().required("*payment id required"),
    date: Yup.string().required("*date required"),
    items: Yup.array().of(
      Yup.object().shape({
        description: Yup.string().required("*description required"),
        price: Yup.number().required("*price required"),
        amount_paid: Yup.number().required("*amount paid required"),
        plan_code: Yup.string().required("*plan code required"),
        days: Yup.number().required("*days required"),
        discount: Yup.number().required("*discount required"),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: values.name,
      email: values.email,
      phone: values.phone,
      student_id: values.student_id,
      learncab_id: values.learncab_id,
      address: values.address,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      country: values.country,
      gst_number: values.gst_number,
      payment_id: values.payment_id,
      date: values.date,
      items: [],
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray<Inputs>({
    name: "items",
    control,
  });

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

  const phone = getValues("phone");
  const [phoneRes, setPhoneRes] = useState({});

  const onSubmit = (data: Inputs) => {
    let details = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      student_id: data.student_id,
      learncab_id: data.learncab_id,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      country: data.country,
      gst_number: data.gst_number,
      payment_id: data.payment_id,
      invoice_date: data.date,
      items: data.items,
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
  };
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
      const studentID = res.data.data[0]._id;
      const learncabID = res.data.data[0].student_id;
      setValue("student_id", studentID);
      setValue("learncab_id", learncabID);
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

  let [pdf, setPdf] = useState();

  const dispatch = useDispatch();
  const Name: string = useSelector((state: any) => state.name);
  const Email: string = useSelector((state: any) => state.email);
  const Phone: number = useSelector((state: any) => state.phone);
  const StudentId: string = useSelector((state: any) => state.student_id);
  const LearncabId: string = useSelector((state: any) => state.learncab_id);
  const Address: string = useSelector((state: any) => state.address);
  const City: string = useSelector((state: any) => state.city);
  const State: string = useSelector((state: any) => state.state);
  const Pincode: string = useSelector((state: any) => state.pincode);
  const Country: string = useSelector((state: any) => state.country);
  const GSTNo: string = useSelector((state: any) => state.gst_number);
  const PaymentId: string = useSelector((state: any) => state.payment_id);
  const InvoiceDate: string = useSelector((state: any) => state.date);

  const itemdetails: any = useSelector((state: any) => state.itemList);
  /**
   *
   * */

  const handleChange = (e: any) => {
    trigger();
    setValues({ ...values, [e.target.name]: e.target.value });

    // const { value } = inputValue.target;
  };

  const handleItemChange = (
    e: { target: { name: any; value: any } },
    index: number
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
  // const handleaddclick = () => {
  //   setItemList([
  //     ...itemList,
  //     {
  //       description: "",
  //       price: "",
  //       amount_paid: "",
  //       plan_code: "",
  //       days: "",
  //       discount: "",
  //     },
  //   ]);
  // };

  // const handleremove = (index: any) => {
  //   const list = [...itemList];
  //   list.splice(index, 1);
  //   setItemList(list);
  // };
  // const getvalue = getValues();
  // console.log("phone",phone);

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
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center items-center border-2 md:border-2 m-9 mx-12 md:m-4 p-4"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 w-full">
                <div className="md:mr-10">
                  <Input
                    type="text"
                    id="name"
                    register={register("name" as const)}
                    title="Name / Business Name"
                    value={values.name || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter Name"
                    error={errors.name?.message}
                  />
                </div>

                <div className="md:mr-10">
                  <Input
                    type="email"
                    register={register("email")}
                    id="email"
                    title="Email"
                    value={values.email || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter Email"
                    error={errors.email?.message}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="Number"
                    register={register("phone")}
                    id="phone"
                    title="Phone No"
                    value={values.phone || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter Phone No"
                    error={errors.phone?.message}
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
                  {phone == phoneRes ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        {...register("student_id" as const)}
                        value={values.student_id}
                        readOnly
                        id="student_id"
                        className={
                          errors.student_id?.message
                            ? "block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none   placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl border-red-500"
                            : "block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                        }
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        {...register("student_id" as const)}
                        value={values.student_id || ""}
                        onChange={(value: any) => handleChange(value)}
                        id="student_id"
                        className={
                          errors.student_id?.message
                            ? "block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none   placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl border-red-500"
                            : "block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                        }
                      />

                      <p className="text-red-600 text-xs mb-2">
                        {errors.student_id?.message}
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
                  {phone == phoneRes ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        {...register("learncab_id" as const)}
                        value={values.learncab_id}
                        readOnly
                        id="learncab_id"
                        className={
                          errors.learncab_id?.message
                            ? "block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none   placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl border-red-500"
                            : "block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                        }
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Student ID"
                        {...register("learncab_id" as const)}
                        value={values.learncab_id || ""}
                        onChange={(value: any) => handleChange(value)}
                        id="learncab_id"
                        className={
                          errors.learncab_id?.message
                            ? "block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none   placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl border-red-500"
                            : "block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-blue-900 focus:outline-none focus:drop-shadow-xl"
                        }
                      />
                      <p className="text-red-600 text-xs mb-2">
                        {errors.learncab_id?.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:mr-10">
                  <Input
                    type="text"
                    id="address"
                    title="Address"
                    register={register("address" as const)}
                    value={values.address || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter Address"
                    error={errors.address?.message}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    id="city"
                    register={register("city" as const)}
                    title="City"
                    value={values.city || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter City"
                    error={errors.city?.message}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    id="state"
                    register={register("state" as const)}
                    title="State"
                    value={values.state || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter State"
                    error={errors.state?.message}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    id="pincode"
                    register={register("pincode" as const)}
                    title="Pincode"
                    value={values.pincode || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter Pincode"
                    error={errors.pincode?.message}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    id="country"
                    register={register("country" as const)}
                    title="Country"
                    value={values.country || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter Country"
                    error={errors.country?.message}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    id="gst_number"
                    register={register("gst_number" as const)}
                    title="GST Number"
                    value={values.gst_number || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter GST Number"
                    error={errors.gst_number?.message}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="text"
                    id="payment_id"
                    title="Payment ID"
                    register={register("payment_id" as const)}
                    value={values.payment_id || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter Payment ID"
                    error={errors.payment_id?.message}
                  />
                </div>
                <div className="md:mr-10">
                  <Input
                    type="Date"
                    id="date"
                    register={register("date" as const)}
                    title="Date"
                    value={values.date || ""}
                    onChange={(value: any) => handleChange(value)}
                    placeholder="Enter Date"
                    error={errors.date?.message}
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
                  className="block mb-2 text-gray-700 text-sm font-bold"
                >
                  Items:
                </label>

                {fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <div className="border-[1px] w-full mt-1 bg-gray-200  border-gray-200 inline-block mb-1 drop-shadow-xl"></div>
                      <div>
                        <div className="grid md:grid-cols-3">
                          <div className="md:mr-10">
                            <Input
                              type="text"
                              id={`items.${index}.description`}
                              register={register(
                                `items.${index}.description` as const
                              )}
                              title="Description"
                              placeholder="Enter Description"
                              onChange={(value: any) =>
                                handleItemChange(value, index)
                              }
                              // value={ndexindextemList[0].price || ""}
                              // error={
                              //   errors &&
                              //   `errors.items.${index}.description` &&
                              //   "*description required"
                              // }
                            />
                          </div>

                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              id={`items.${index}.price`}
                              register={register(
                                `items.${index}.price` as const
                              )}
                              title="Price"
                              placeholder="Enter Price"
                              onChange={(value: any) =>
                                handleItemChange(value, index)
                              }
                              // value={itemList[0].price || ""}
                              // error={
                              //   `errors.items.${index}.price` &&
                              //   "*price required"
                              // }
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              id={`items.${index}.amount_paid`}
                              register={register(
                                `items.${index}.amount_paid` as const
                              )}
                              title="Amount Paid"
                              placeholder="Enter Amount Paid"
                              // value={itemList[0].amount_paid || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, index)
                              }
                              // error={
                              //   `errors.items.${index}.amount_paid` &&
                              //   "*amount paid required"
                              // }
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="string"
                              id={`items.${index}.plan_code`}
                              register={register(
                                `items.${index}.plan_code` as const
                              )}
                              title="Plan Code"
                              placeholder="Enter Plan Code"
                              // value={itemList[0].plan_code || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, index)
                              }
                              // error={
                              //   `errors.items.${index}.plan_code` &&
                              //   "*plan code required"
                              // }
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              id={`items.${index}.days`}
                              register={register(
                                `items.${index}.days` as const
                              )}
                              title="Days"
                              placeholder="Enter Days"
                              // value={itemList[0].days || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, index)
                              }
                              // error={
                              //   `errors.items.${index}.days` && "*days required"
                              // }
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="string"
                              register={register(
                                `items.${index}.discount` as const
                              )}
                              id={`items.${index}.discount`}
                              title="Discount"
                              placeholder="Enter Discount"
                              // value={itemList[0].discount || ""}
                              onChange={(value: any) =>
                                handleItemChange(value, index)
                              }
                              // error={
                              //   `errors.items.${index}.discount` &&
                              //   "*plan code required"
                              // }
                            />
                          </div>
                        </div>
                        <div className="flex justify-end items-center mr-6">
                          <div>
                            <button
                              className="m-4 w-20 py-2 text-xs text-white rounded bg-red-600 hover:bg-red-500 border-red-500 hover:text-white"
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {errors.items && (
                  <p className="text-red-600 text-xs mb-2 ">*items required</p>
                )}
                <div className="border-[1px] w-full mt-1 bg-gray-200  border-gray-200 inline-block mb-1 drop-shadow-xl"></div>

                <div className="flex justify-end items-center mr-6">
                  <div>
                    <button
                      className="m-4 w-20 py-2 text-xs text-white rounded bg-darkViolet hover:bg-blue-800 hover:text-white"
                      onClick={() => {
                        append({
                          description: "",
                          price: "",
                          amount_paid: "",
                          plan_code: "",
                          days: "",
                          discount: "",
                        });
                      }}
                    >
                      Add items
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-[1px] w-full mt-4 bg-gray-200  border-gray-200 inline-block mb-1 drop-shadow-xl"></div>
              <div className="flex flex-row">
                <button
                  type="submit"
                  className="m-4 w-20 py-1 text-center text-white rounded  bg-darkViolet  disabled:opacity-40 disabled:bg-red-600  hover:bg-blue-800 hover:text-white"
                  onClick={() => {
                    trigger();
                  }}
                >
                  Submit
                </button>

                <button
                  type="reset"
                  className="m-4 w-20 py-1 text-center text-white rounded bg-darkViolet hover:bg-blue-800 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    reset({
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
                      items: [
                        {
                          description: "",
                          price: "",
                          amount_paid: "",
                          plan_code: "",
                          days: "",
                          discount: "",
                        },
                      ],
                    });
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col items-center justify-center  md:w-[670px]  lg:w-auto min-h-[600px] border-2 m-4 bg-gray-300">
              <PdfViewer pdfUrl={pdf} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
