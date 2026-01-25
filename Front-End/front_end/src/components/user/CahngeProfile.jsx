import { faCamera, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../API/Context/AuthContext";
function ChangProfile () {
    const navigate=useNavigate();
    const{UpdateUser,user,loading}=useAuth();
    const [img,setImage]=useState(()=>user?`http://localhost:4000/uploads/${user.avatar}`:null);
    useEffect(()=>{
      
      console.log("user",
      )
      if(user!=null)
      {
        setImage(`http://localhost:4000/uploads/${user.avatar}`)
      }
      
    },[user])
      const schema=Yup.object({
        userName:Yup.string().required("UserName is required"),
        password:Yup.string().min(8,"Password at least 8 charcters"),
        avatar:Yup.mixed(),
        currentPassword:Yup.string().min(8,"Password at least 8 charcters"),
        confirmPassword:Yup.string().oneOf([Yup.ref('password')],"Passwords must match"),
    })
    const formik=useFormik({
        initialValues:{
            userName:user?user.userName:"guest",
            currentPassword:'',
            password:'',
            avatar:null,
            confirmPassword:''
        },
        validationSchema:schema,
        onSubmit:(values)=>handleCahnge(values)
    })
    useEffect(()=>{
      if(user!=null)
      {
        formik.setFieldValue('userName',user.userName);
        formik.setFieldValue('avatar',user.avatar);
      }
    },[user])
    
    const handleFile=(event)=>
    {
        const file=event.currentTarget.files[0];
        formik.setFieldValue('avatar',file)
        const url=URL.createObjectURL(file);
        console.log("url",url)
        setImage(url)
    }
    const handleCahnge=async(values)=>
    {
     const data=new FormData()
     data.append("userName",values.userName);
     console.log("values.password",values.password)
     data.append("currentPassword",!values.currentPassword?user.password:values.currentPassword);
     data.append("avatar",values.avatar);
     data.append("password",values.password);
     await UpdateUser(data,user._id);

    }
     return (
        <>{loading||user==null?<h1>Loading</h1>:  
          
         <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        
        {/* Profile Picture Section */}
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              {console.log("img",img)}
              <img
                src={img}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-gray-100 object-cover"
              />
            </div>
            <label htmlFor="avatar_user" className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                 <FontAwesomeIcon icon={faCamera} size={18} />
              Change Avatar
            </label>
            <input
            id="avatar_user"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
           
          </div>
          <p className="mt-3 text-sm text-gray-500">Click to update your profile picture</p>
        </section>

        <hr className="border-gray-100 mb-8" />

        {/* Profile Information Section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 text-emerald-600 mb-6">
            <FontAwesomeIcon icon={faUser} size={20} />
            <h2 className="font-semibold">Profile Information</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              {console.log("user.userName=>",formik.values.userName)}
              <label className="block! text-start  text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formik.values.userName}
                onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 name="userName"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
              {formik.errors.userName && formik.touched.userName?<p className="text-red-500">{formik.errors.userName}</p>:null}
            </div>
            
            
            <div>
              {/* {console.log("user.email=>",user.user.email)} */}
              <label className="block! text-start text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
              />
              <p className="mt-2 text-xs text-gray-400">Email address cannot be changed</p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 mb-8" />

        {/* Change Password Section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 text-emerald-600 mb-6">
            <FontAwesomeIcon icon={faLock} size={20} />
            <h2 className="font-semibold">Change Password</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block! text-sm font-medium text-gray-700 mb-2 text-start">Current Password</label>
              <input
                type="password"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="currentPassword"
                placeholder="Enter current password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
              />
              {formik.errors.currentPassword && formik.touched.currentPassword?<p className="text-red-500">{formik.errors.currentPassword}</p>:null}
            </div>
            
            <div>
              <label className="text-start block! text-sm font-medium text-gray-700 mb-2 ">New Password</label>
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
              />
              {formik.errors.password && formik.touched.password?<p className="text-red-500">{formik.errors.password}</p>:null}
            </div>

            <div>
              <label className="block! text-start text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword?<p className="text-red-500">{formik.errors.confirmPassword}</p>:null}
              <p className="mt-2 text-xs text-gray-500">Leave password fields empty if you don't want to change your password</p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button onClick={()=>navigate('/profile')}  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg! transition-colors">
            Cancel
          </button>
          <button onClick={formik.handleSubmit} className="  flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg! shadow-md shadow-emerald-100 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>}</>

  );
 }
 export default ChangProfile;