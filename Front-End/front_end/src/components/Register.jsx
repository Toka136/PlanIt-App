import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope,faLock,faUser} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../API/authSlice";
import { useState } from "react";
function Register ()
{
  const [Register_user]=useRegisterMutation();
  const [imgUrl,setImageUrl]=useState('');
  const navigate=useNavigate()
    const registerSchema = Yup.object({
    FullName: Yup.string().required("FullName is required"),
    Email: Yup.string().required("Email is required"),
    passWord: Yup.string().required("Password is required").min(8,"Password at least 8 charcters"),
    confirmPassword: Yup.string().required("confirmPassword is required").oneOf([Yup.ref('passWord')],"Passwords must match"),
    avatar:Yup.mixed()
   
  });
  const registerFormik = useFormik({
    initialValues: {
    FullName:"",
      Email: "",
      passWord: "",
      confirmPassword:"",
      avatar:null
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log("values=>", values);
      register(values)
    },
  });
   const handleFile=(event)=>
  {
   const file=event.currentTarget.files[0];
   console.log('file',file)
    registerFormik.setFieldValue('avatar',file)
    const url=URL.createObjectURL(file);
    setImageUrl(url)

  }
  const register=async (values)=>
  {
    const user=new FormData()
    user.append('userName',values.FullName);
    user.append('email',values.Email);
    user.append('password',values.passWord);
    user.append('avatar',values.avatar);
    console.log("uaer",user)
    try
    {
      const response= await Register_user(user).unwrap();
      console.log("response",response)
       navigate('/login')
    }catch(err){
      console.log("error",err)
    }

     


  }
 
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

        <form onSubmit={registerFormik.handleSubmit}>
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
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.FullName}
              />
            </div>

            
            {registerFormik.errors.FullName && registerFormik.touched.FullName ? (
              <div className="text-danger small">
                {registerFormik.errors.FullName}
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
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.Email}
              />
            </div>

            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
            {registerFormik.errors.Email && registerFormik.touched.Email ? (
              <div className="text-danger small">
                {registerFormik.errors.Email}
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
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.passWord}
              />
            </div>
            {registerFormik.errors.passWord && registerFormik.touched.passWord ? (
              <div className="text-danger small">
                {registerFormik.errors.passWord}
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
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                value={registerFormik.values.confirmPassword}
              />
            </div>
            {registerFormik.errors.confirmPassword && registerFormik.touched.confirmPassword ? (
              <div className="text-danger small">
                {registerFormik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
           <div className="profil_avatar">
            <p>Profile Picture</p>
            <div className="profil_avatar_cont">
              <img src={imgUrl?imgUrl:"default.jpg"}/>
             <div className="text_avatar">
              <label htmlFor="avatar">add avatar</label>
              <input 
              id="avatar"
              onChange={handleFile}
              
              // value={avatar}
              type="file"
              />
              {/* <p>Click to set your profile picture</p> */}
              </div>
            </div>
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