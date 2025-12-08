import "../components/componentsCss/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope,faLock} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
function Login() {
  const loginSchema = Yup.object({
    Email: Yup.string().required("Email is required"),
    passWord: Yup.string().required("Password is required"),
  });
  const loginFormik = useFormik({
    initialValues: {
      Email: "",
      passWord: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("values=>", values);
    },
  });
  return (
    <div className="Auth">
      <div className="Auth_cont">
        <div className="logo">
          <img src="logo.png" alt="" className="logo_img" />

          <p className="text-center fs-3">Welcome Back</p>
          <p className="text-center fs-5 details">
            Sign in to manage your tasks
          </p>
        </div>

        <form onSubmit={loginFormik.handleSubmit}>
          <div className="mb-3  form_input">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faEnvelope} style={{ color: "#99a1af" }} />
              <input
                type="email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="Email"
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                value={loginFormik.values.Email}
              />
            </div>

            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
            {loginFormik.errors.Email && loginFormik.touched.Email ? (
              <div className="text-danger small">
                {loginFormik.errors.Email}
              </div>
            ) : null}
          </div>
          <div className="mb-3 form_input">
            <label htmlFor="passWord" className="form-label">
              Password
            </label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faLock} style={{ color: "#99a1af" }} />
              <input
                type="password"
                name="passWord"
                id="passWord"
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                value={loginFormik.values.passWord}
              />
            </div>
            {loginFormik.errors.passWord && loginFormik.touched.passWord ? (
              <div className="text-danger small">
                {loginFormik.errors.passWord}
              </div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </form>
        <div className="mt-4 text-m link_parent"><p className="text-center">Don't have an account?<NavLink className="Auth_link" to={'/register'} >Sign up</NavLink></p></div>
      </div>
    </div>
  );
}
export default Login;
