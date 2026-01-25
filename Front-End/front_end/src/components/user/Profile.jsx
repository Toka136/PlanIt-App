import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPen, faTasks} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ChangProfile from "./CahngeProfile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../API/Context/AuthContext";
import { useTasks } from "../../API/Context/TasksContext";
function Profile() {
    const [open, setOpen] = useState(false);
    const {user,loading,error}=useAuth();
    const {tasks}=useTasks();
    const navigate=useNavigate()
    return (
      <>
      {loading?<h1>Loading...</h1>:error?<h1>{error}</h1>:  <div>  {open?<ChangProfile setopen={setOpen}/>:   <div className="bg-gray-50 pt-3 h-fit pb-5 ">
            <div className="w-[60%] ml-[15%] rounded-2xl shadow-2xl h-full pb-5">
                <div className="bg-[#009966] h-[200px] w-full rounded-t-2xl"></div>
                <div className="transform -translate-y-1/4   pl-3">
                    <img className="w-[100px] mb-2 h-[100px]  rounded-full border-2  border-white" src={`http://localhost:4000/uploads/${user.avatar}`}/>
                    <p className="text-start ml-5! mt-4 text-black text-md ">{user.userName}</p>
                    <p className="text-start ml-5! mt-2 text-[#4a5565] text-md">{user.email}</p>
                    <button onClick={()=>navigate('/changeprofile')} className=" mt-4 gap-2 flex items-center px-4 py-3 rounded-xl! bg-[#009966] text-center text-white"> 
                        <FontAwesomeIcon icon={faPen} style={{ color: "white" }} />
                        <p className="capitalize text-bold">edit profile</p>
                    </button>
                </div>
                <div className="w-full px-4">
                    <div className="w-50 rounded-2xl bg-[#F3F3F4]! border border-[rgb(195, 195, 195)] px-4 py-4">
                        <div className="flex gap-2">
                            <FontAwesomeIcon icon={faTasks} className="p-2 text-[#009966] bg-green-200 rounded-[5px]" />
                            <p className="text-black text-lg">Activity</p>
                        </div>
                        <p className="text-[#4a5565] text-start mt-3">Active Tasks</p>
                        <p className="text-black text-start mt-1">{tasks.filter((task) => task.status === "In Progress").length}</p>
                        <p className="text-[#4a5565] text-start mt-1">Completed Tasks</p>
                        <p className="text-black text-start mt-1">{tasks.filter((task) => task.status === "Completed").length}</p>
                    </div>
                </div>
            </div>
        </div>}</div>}
    
    
      </>
     
    );
}
 
export default Profile;