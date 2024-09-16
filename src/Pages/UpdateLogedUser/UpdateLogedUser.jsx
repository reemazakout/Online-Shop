import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/User.context";

export default function UpdateLoggedUser() {
  const navigate = useNavigate();

  async function sendDataToLogin(values) {
    // !WRONG END POINT 👇👇
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",

        data: {
          email: values.email,
          newPassword: values.newPassword,
        },
      };

      console.log("Sending request with options:", options);

      const { data } = await axios.request(options);
      console.log(data);

      toast.success("Password changed successfully");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      console.error("An error occurred:", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(
          /^[a-zA-Z0-9]*$/,
          "Password must contain only letters and numbers"
        )
        .min(6, "Must be 6 characters or more")
        .required("New password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
      sendDataToLogin(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full p-8">
      <div className="mb-4 text-2xl font-semibold">Update your password</div>

      <div className="mb-4">
        <input
          autoComplete="on"
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your Email"
          className={`w-full p-3 border rounded-md ${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="mt-2 text-sm text-red-500">{formik.errors.email}</div>
        )}
      </div>

      <div className="mb-4">
        <input
          autoComplete="on"
          type="password"
          id="newPassword"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your new password"
          className={`w-full p-3 border rounded-md ${
            formik.touched.newPassword && formik.errors.newPassword
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {formik.touched.newPassword && formik.errors.newPassword && (
          <div className="mt-2 text-sm text-red-500">
            {formik.errors.newPassword}
          </div>
        )}
      </div>

      <button type="submit" className="btn-primary">
        Update Password ✨
      </button>
    </form>
  );
}
