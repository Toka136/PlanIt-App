import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope,faLock,faUser} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
function Register ()
{
    const registerSchema = Yup.object({
    FullName: Yup.string().required("FullName is required"),
    Email: Yup.string().required("Email is required"),
    passWord: Yup.string().required("Password is required").min(8,"Password at least 8 charcters"),
    confirmPassword: Yup.string().required("confirmPassword is required").oneOf([Yup.ref('passWord')],"Passwords must match"),
  });
  const loginFormik = useFormik({
    initialValues: {
    FullName:"",
      Email: "",
      passWord: "",
      confirmPassword:""
    },
    validationSchema: registerSchema,
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
            <label htmlFor="fullname" className="form-label">
              FullName
            </label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faUser} style={{ color: "#99a1af" }} />
              <input
                type="text"
                id="fullname"
               
                name="FullName"
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                value={loginFormik.values.FullName}
              />
            </div>

            
            {loginFormik.errors.FullName && loginFormik.touched.FullName ? (
              <div className="text-danger small">
                {loginFormik.errors.FullName}
              </div>
            ) : null}
          </div>
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
          <div className="mb-3 form_input">
            <label htmlFor="confirmPassWord" className="form-label">
              confirmPassWord
            </label>
            <div className="input-icon">
              <FontAwesomeIcon icon={faLock} style={{ color: "#99a1af" }} />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                value={loginFormik.values.confirmPassword}
              />
            </div>
            {loginFormik.errors.confirmPassword && loginFormik.touched.confirmPassword ? (
              <div className="text-danger small">
                {loginFormik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button type="submit" className="btn btn-primary">
            Create account
          </button>
        </form>
        <div className="mt-4 text-m link_parent"><p className="text-center">Already have an account?<NavLink to={'/login'} className="Auth_link" >Sign in</NavLink></p></div>
      </div>
    </div>
  );
}
export default Register