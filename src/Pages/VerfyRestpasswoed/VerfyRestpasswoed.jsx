import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyResetPassword() {
  const navigate = useNavigate();
  async function getResetCode(values) {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        headers: {},
        data: values,
      };
      const { data } = await axios.request(options);
      console.log(data);
      console.log("Reset code sent successfully");
      toast.success("Reset code sent successfully");
      navigate("/resetpassword");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required("Reset code is required"),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: (values) => {
      getResetCode(values);
    },
  });

  return (
    <div className="min-h-screen ">
      <form onSubmit={formik.handleSubmit} className="w-full p-8 ">
        <div className="mb-4 text-2xl font-semibold text-center">
          Please enter your verification code
        </div>

        <div className="mb-4">
          <input
            autoComplete="on"
            type="text"
            id="resetCode"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your reset code"
            className={`w-full p-3 border rounded-md ${
              formik.touched.resetCode && formik.errors.resetCode
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.resetCode && formik.errors.resetCode ? (
            <div className="mt-2 text-sm text-red-500">
              {formik.errors.resetCode}
            </div>
          ) : null}
        </div>

        <button type="submit" className="btn-primary">
          Verify
        </button>
      </form>
    </div>
  );
}
