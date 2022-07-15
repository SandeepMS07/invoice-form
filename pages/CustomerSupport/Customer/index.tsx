/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Children, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import SearchButton from "../../../components/Buttons/searchButton";
import CustomerLayout from "../../../components/customers/CustomerLayout";
import ModifyDetails from "../../../components/customers/ModifyDetails";
import Table from "../../../components/table/table";

const Customer = (props: any) => {
  const { children } = props;
  const [searchKey, setSearchKey] = useState();
  const [data, setData] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [customers, setCustomers] = useState("");

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

  const handleOptions = (e: any) => {
    setCustomers(e.target.value);
    setIsChecked(true);
  };

  console.log(customers);
  const details = [
    { value: "modifyDetails", title: "Modify Details" },
    { value: "resetPassword", title: "Reset Password" },
    { value: "refundCredit", title: "Refund Credit" },
    { value: "addExtension", title: "Add Extension" },
    { value: "otpVerify", title: "OTP Verification" },
  ];

  return <CustomerLayout>
    <ModifyDetails/>
  </CustomerLayout>;
};

export default Customer;
