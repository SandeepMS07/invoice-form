import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import { reset, update } from "../redux/userSlice";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
      price: number;
      amount_paid: number;
      plan_code: string;
      days: number;
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

  const {
    register,
    handleSubmit,
    watch,
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
  });

  const { fields, append, remove } = useFieldArray<Inputs>({
    name: "items",
    control,
  });

  console.log(errors);
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

  const onSubmit = (data: Inputs) => console.log(data);
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

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    // const { value } = inputValue.target;
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
                    register={register("name", {
                      required: "*name required",
                      minLength: { value: 5, message: "*minimum 5 characters" },
                    })}
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
                    register={register("email", {
                      required: "*email required",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "email should be in form axxxxx@xxxx.com",
                      },
                    })}
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
                    register={register("phone", {
                      required: "*phone no required",
                    })}
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
                        {...register("student_id", {
                          required: "*student id required",
                        })}
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
                        {...register("student_id", {
                          required: "*student id required",
                        })}
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
                        {...register("learncab_id", {
                          required: "*learncab id required",
                        })}
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
                        {...register("learncab_id", {
                          required: "*learncab id required",
                        })}
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
                    register={register("address", {
                      required: "*address required",
                    })}
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
                    register={register("city", {
                      required: "*city required",
                    })}
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
                    register={register("state", {
                      required: "*state required",
                    })}
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
                    register={register("pincode", {
                      required: "*pincode required",
                    })}
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
                    register={register("country", {
                      required: "*country required",
                    })}
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
                    register={register("gst_number")}
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
                    register={register("payment_id", {
                      required: "*payment id required",
                    })}
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
                    register={register("date", { required: "date required" })}
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
                  className="block text-gray-700 text-sm font-bold"
                >
                  Items:
                </label>

                {/* {console.log("fields",fields)} */}
                {fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <div className="border-[1px] w-full mt-1 bg-gray-200  border-gray-200 inline-block mb-1 drop-shadow-xl"></div>
                      <div>
                        <div className="grid md:grid-cols-3">
                          <div className="md:mr-10">
                            <Input
                              type="text"
                              id="description"
                              register={register(`items.${index}.description`, {
                                required: "required",
                              })}
                              title="Description"
                              placeholder="Enter Description"
                              // value={itemList[0].description || ""}
                              // onChange={(value: any) =>
                              //   handleItemChange(value, i, "description")
                              // }
                              error={`errors.items.${index}.description?.message`}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              id="price"
                              register={register(`items.${index}.price`, {
                                required: "required",
                              })}
                              title="Price"
                              placeholder="Enter Price"
                              // onChange={(value: any) =>
                              //   handleItemChange(value, i, "price")
                              // }
                              // value={itemList[0].price || ""}
                              error={`errors.items.${index}.price?.message`}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              id="amount_paid"
                              register={register(`items.${index}.amount_paid`, {
                                required: "required",
                              })}
                              title="Amount Paid"
                              placeholder="Enter Amount Paid"
                              // value={itemList[0].amount_paid || ""}
                              // onChange={(value: any) =>
                              //   handleItemChange(value, i, "amount_paid")
                              // }
                              error={`errors.items.${index}.amount_paid?.message`}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="string"
                              id="plan_code"
                              register={register(`items.${index}.plan_code`, {
                                required: "required",
                              })}
                              title="Plan Code"
                              placeholder="Enter Plan Code"
                              // value={itemList[0].plan_code || ""}
                              // onChange={(value: any) =>
                              //   handleItemChange(value, i, "plan_code")
                              // }
                              error={`errors.items.${index}.plan_code?.message`}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="Number"
                              id="days"
                              register={register(`items.${index}.days`, {
                                required: "required",
                              })}
                              title="Days"
                              placeholder="Enter Days"
                              // value={itemList[0].days || ""}
                              // onChange={(value: any) =>
                              //   handleItemChange(value, i, "days")
                              // }
                              error={`errors.items.${index}.days?.message`}
                            />
                          </div>
                          <div className="md:mr-10">
                            <Input
                              type="string"
                              register={register(`items.${index}.discount`, {
                                required: "required",
                              })}
                              id="discount"
                              title="Discount"
                              placeholder="Enter Discount"
                              // value={itemList[0].discount || ""}
                              // onChange={(value: any) =>
                              //   handleItemChange(value, i, "discount")
                              // }
                              error={`errors.items.${index}.discount?.message`}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end items-center mr-6">
                          {/* <div>
                            <button
                              className="m-4 w-20 py-2 text-xs text-white rounded bg-darkViolet hover:bg-blue-800 hover:text-white"
                              onClick={() => {
                                append({});
                              }}
                            >
                              Add items
                            </button>
                          </div> */}
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
                <div className="flex justify-end items-center mr-6">
                  <div>
                    <button
                      className="m-4 w-20 py-2 text-xs text-white rounded bg-darkViolet hover:bg-blue-800 hover:text-white"
                      onClick={() => {
                        append({});
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
                    Array.from(document.querySelectorAll("input")).forEach(
                      (input) => (input.value = "")
                    );
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
