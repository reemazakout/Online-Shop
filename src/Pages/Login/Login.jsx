import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/User.context";

export default function Login() {
  let id;
  const [errMsg, setErrMsg] = useState(null);
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9]*$/,
        " password must contain only letters and numbers"
      )
      .min(6, "Must be 6 characters or more")
      .required("Required"),
  });

  async function sendDataToLogin(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      id = toast.loading("waiting...");

      const { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(id);
      toast.success("logined successfully");
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        console.log(token);
        navigate("/home");
      }
    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      console.log(error);
      setErrMsg(error.response.data.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <form
        className="container flex-grow pt-20 mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div>
            <i className="text-primary text-2xl rounded-full p-1 fa-solid fa-user"></i>
            <span className="px-1 text-xl text-primary font-semibold">
              Login Now
            </span>
          </div>
          <div>
            <span>Email :</span>
            <input
              id="email"
              autoComplete="on"
              className="w-full form-control"
              type="email"
              name="email"
              placeholder="Your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-500 font-semibold">
                *{formik.errors.email}
              </div>
            ) : null}
          </div>

          <div>
            <span>Password :</span>
            <input
              id="password"
              autoComplete="on"
              className="w-full form-control"
              type="password"
              name="password"
              placeholder="Your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-500 font-semibold">
                *{formik.errors.password}
              </div>
            ) : null}
            {errMsg ? (
              <div className="text-red-500 font-semibold py-3">*{errMsg}</div>
            ) : null}
          </div>

          <button type="submit" className="btn-primary ms-auto">
            Login
          </button>
          <Link
            to="/forgetPassword"
            className="text-slate-500 hover:text-slate-950 hover:font-semibold"
          >
            Forget Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
