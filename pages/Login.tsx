import { MdLockOutline } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    trigger(name)
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (data: any) => {
    console.log(data);
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
                  <div className="bg-gray-100 w-56 md:w-64 p-1 md:p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
                      type="email"
                      id="username"
                      {...register("username" as const, {
                        required: "*username required",
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
                  <div className="bg-gray-100 w-56 md:w-64 p-1 md:p-2 flex items-center mb-3">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type="password"
                      id="password"
                      {...register("password" as const, {
                        required: "*password required"
                      })}
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm font-medium flex-1"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-red-600 text-xs m-3 text-start">
                    {errors.password?.message}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="border-2 border-darkViolet text-darkViolet rounded-full px-8 md:px-12 py-1 md:py-2 inline-block font-semibold hover:bg-darkViolet hover:text-white"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
