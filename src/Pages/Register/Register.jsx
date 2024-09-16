import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let id;
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();
  const phoneregex =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(" Name is required")
      .max(25, "it should be less than 25 characters")
      .min(3, "it should be more than 3 characters"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9]*$/,
        " password must contain only letters and numbers"
      )
      .min(6, "Must be 6 characters or more")
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    phone: Yup.string()
      .required("phone is Required")
      .matches(
        phoneregex,
        "phone must be start with a number , followed by 9 numbers"
      ),
  });
  async function sendDataToRegister(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      id = toast.loading("waiting...");

      const { data } = await axios.request(options);
      console.log(data);
      toast.dismiss(id);
      toast.success("user created successfully");
      if (data.message === "success") {
        navigate("/auth/login");
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: sendDataToRegister,
  });
  return (
    <>
      <form
        className=" pt-[85px] min-h-screen  container "
        onSubmit={formik.handleSubmit}
      >
        <div className="">
          <div className="flex flex-col gap-4">
            <div>
              <i className=" text-primary  text-2xl  rounded-full  p-1 fa-solid fa-user-plus"></i>
              <span className="px-1 text-primary font-semibold text-xl">
                Register Now
              </span>
            </div>
            <div>
              <span>Name :</span>
              <input
                className=" w-full form-control"
                type="text"
                name="name"
                id=""
                placeholder="Your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="text-red-500 font-semibold">
                  *{formik.errors.name}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <span>Email :</span>
              <input
                className=" w-full form-control"
                type="email"
                name="email"
                id=""
                placeholder="Your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-red-500 font-semibold">
                  *{formik.errors.email}
                </div>
              ) : (
                ""
              )}
              {errMsg ? (
                <div className="text-red-500 font-semibold">*{errMsg}</div>
              ) : (
                ""
              )}
            </div>

            <div>
              <span>Password :</span>
              <input
                className=" w-full form-control"
                type="password"
                name="password"
                id=""
                placeholder="Your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-red-500 font-semibold">
                  *{formik.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <span>Re-password :</span>
              <input
                type="password"
                className=" w-full form-control"
                name="rePassword"
                id=""
                placeholder="Your Re-password"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className="text-red-500 font-semibold">
                  *{formik.errors.rePassword}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <span>Phone :</span>
              <input
                className=" w-full form-control"
                type="tel"
                name="phone"
                id=""
                placeholder="Your phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="text-red-500 font-semibold">
                  *{formik.errors.phone}
                </div>
              ) : (
                ""
              )}
            </div>
            <button type="submit" className=" btn-primary ms-auto">
              Register
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
