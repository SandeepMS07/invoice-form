import { MdLockOutline } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
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
        passwordShown: false
    });
    const [loginError, setLoginError] = useState(false)
    const router = useRouter()


    const togglePassword = () => {
        setValues({ ...values, passwordShown: !values.passwordShown })
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        trigger()
        setValues({ ...values, [name]: value });
    };

    const onSubmit = (data: any) => {
        const details: any = {
            email: data.username,
            password: data.password
        }
 

        axios({
            method: "post",
            url: url,
            data: details,
            headers: {
                "Content-Type": "application/json",
                "ocp-apim-subscription-key": "c442b3d7489942058d2a83e7a023b731"
            },
        })
            .then((res) => {
                // const token = res.sessiontoken
                // console.log(token);
                axios.post("/api/login", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // body: JSON.stringify({ token: "ABCD" })
                }).then(()=>{
                router.push("/Invoice")
                })
            })
            .catch(() => {
                setLoginError(!loginError)
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
                                                required: "*username required", pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "*email should be in axxxx@xxx.com" }
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
                                                required: "*password required"
                                            })}
                                            placeholder="Password"
                                            className="bg-gray-100 outline-none text-sm font-medium flex-1"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        {values.passwordShown ? <AiFillEye onClick={togglePassword} /> :
                                            <AiFillEyeInvisible onClick={togglePassword} />}
                                    </div>
                                    <p className="text-red-600 text-xs m-3 text-start">
                                        {errors.password?.message}
                                    </p>
                                </div>
                                {loginError && <p className="text-red-600 text-xs m-3 text-start">*Invalid credentials</p>}
                            </div>

                            <button
                                type="submit"
                                className="border-2 bg-darkViolet border-darkViolet text-white rounded-full px-8 md:px-12 py-1 md:py-2 inline-block font-semibold hover:bg-blue-800 hover:text-white hover:shadow-lg"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
 