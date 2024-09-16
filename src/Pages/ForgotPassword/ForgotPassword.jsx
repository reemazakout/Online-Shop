import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();

  async function sendDataToLogin(values) {
    const loadingToast = toast.loading("loading...");

    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      method: "POST",
      data: values,
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);

      toast.dismiss(loadingToast);
      navigate("/send-code");
      toast.success("The code has been sent to your email");
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error("The user does not exist.");
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      sendDataToLogin(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="w-full p-8">
        <div className="mb-4 text-2xl font-semibold">
          Please enter your email
        </div>

        <div className="mb-4">
          <input
            autoComplete="on"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            className={`w-full p-3 border rounded-md ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="mt-2 text-sm text-red-500">
              {formik.errors.email}
            </div>
          )}
        </div>

        <button type="submit" className="btn-primary">
          Verify
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
