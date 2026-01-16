import "../components/componentsCss/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope,faLock} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
import { AuthProvider, useAuth } from "../API/Context/AuthContext";
import { useEffect } from "react";
function Login() {
  useEffect(()=>
  {
    localStorage.clear();
  },[])
  const errorNotify=()=>toast.error('Invalid data')
  const {Loginfun}=useAuth();
      const auth=useAuth();
  const loginSchema = Yup.object({
    Email: Yup.string().required("Email is required"),
    passWord: Yup.string().required("Password is required"),
  });
  const navigate=useNavigate();
  const loginFormik = useFormik({
    initialValues: {
      Email: "",
      passWord: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUser(values)
    },
  });
  const  loginUser=async(values)=>
  {
     localStorage.clear()
    console.log("Auth Context Value:", auth);
    console.log("values",values)
       try{
        const res=await Loginfun(values.Email,values.passWord);
          console.log("res=>",res)
        navigate('/homepage');
        
       }catch(err)
       {
          errorNotify()
          console.log("err",err)
       }
  }
  return (
    <div className="Auth">
      <div className="Auth_cont">
        <div className="logo">
          <img src="logo.png" alt="" className="logo_img" />

          <p className="text-center ">Welcome Back</p>
          <p className="text-center fs-5 details ">
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
        <ToastContainer/>
        <div className="mt-4 text-m link_parent"><p className="text-center">Don't have an account?<NavLink className="Auth_link" to={'/register'} >Sign up</NavLink></p></div>
      </div>
    </div>
  );
}
export default Login;
