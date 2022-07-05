import { MdLockOutline } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  type Inputs = {
    username: string;
    password: string;
  };
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [values, setValues] = useState({
    username: "",
    password: "",
    passwordShown: false,
  });
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePassword = () => {
    setValues({ ...values, passwordShown: !values.passwordShown });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    trigger();
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (data: any) => {
    setIsLoading(true);
    const details: any = {
      email: data.username,
      password: data.password,
    };
 
   
    axios({
      method: "post",
      url: url,
      data: details,
      headers: {
        "Content-Type": "application/json",
        "ocp-apim-subscription-key": "c442b3d7489942058d2a83e7a023b731",
      },
    })
      .then((res) => {
        // const token = res.sessiontoken
        // console.log(token);
        axios
          .post("/api/Login", {
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify({ token: "ABCD" })
          })
          .then(() => {
            router.push("/CustomerSupport/Invoice");
          });
        setIsLoading(false);
      })
      .catch(() => {
       setIsLoading(false)

        setLoginError(!loginError);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen w-full  text-center bg-gray-200">
      <div className="flex items-center justify-center w-96 max-w-4xl bg-white rounded-2xl shadow-2xl">
        <div className="p-4 md:p-5">
          <div className="p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-darkViolet mb-1 md:mb-2">
              Sign in to Account
            </h2>
            <div className="border-b-2 w-12 md:w-20 bg-darkViolet border-darkViolet inline-block mb-2"></div>
            <form
              className="flex flex-col items-center mb-1 md:mb-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <div>
                  <div className="bg-gray-100 w-56 md:w-64 p-1 md:p-2 flex items-center mb-3 hover:shadow-xl">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
                      type="text"
                      id="username"
                      {...register("username" as const, {
                        required: "*username required",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "*email should be in axxxx@xxx.com",
                        },
                      })}
                      placeholder="Username"
                      className="bg-gray-100 outline-none text-sm font-medium flex-1"
                      value={values.username}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-red-600 text-xs m-3 text-start">
                    {errors.username?.message}
                  </p>
                </div>

                <div>
                  <div className="bg-gray-100 w-56 md:w-64 p-1 md:p-2 flex items-center mb-3 hover:shadow-lg">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type={values.passwordShown ? "text" : "password"}
                      id="password"
                      {...register("password" as const, {
                        required: "*password required",
                      })}
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm font-medium flex-1"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {values.passwordShown ? (
                      <AiFillEye onClick={togglePassword} />
                    ) : (
                      <AiFillEyeInvisible onClick={togglePassword} />
                    )}
                  </div>
                  <p className="text-red-600 text-xs m-3 text-start">
                    {errors.password?.message}
                  </p>
                </div>

                {loginError && (
                  <p className="text-red-600 text-xs m-3 text-start">
                    *Invalid credentials
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="border-2 bg-darkViolet border-darkViolet text-white rounded-full px-8 md:px-12 mb-5 py-1 md:py-2 inline-block font-semibold hover:bg-blue-800 hover:text-white hover:shadow-lg disabled:hover:shadow-none disabled:hover:border-red-900 disabled:hover:bg-red-600 disabled:border-none disabled:cursor-not-allowed"
              >
                Sign in
              </button>
              {isLoading && (
                <button
                  disabled={!isLoading}
                  type="button"
                  className="py-1 md:py-2"

                  //   className="text-white bg-darkViolet hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  <svg
                    role="status"
                    className="inline w-6 mr-2 text-darkViolet  disabled:text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
 
