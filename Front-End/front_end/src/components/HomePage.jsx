import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleCheck, faClock, faHourglassStart, faListCheck } from '@fortawesome/free-solid-svg-icons';
import './componentsCss/Tasks.css'
import { useGetTasksQuery } from "../API/tasksSlice";
import { useEffect } from "react";
// import { useEffect } from "react";
function HomePage()
{
    const {
        data:tasks,
        isLoading,
        isError,
        isSuccess
    }=useGetTasksQuery();
    const pendingTasks=tasks?tasks.data.filter((x)=>x.status === "In Progress"):[];
    const completedTasks=tasks?tasks.data.filter((x)=>x.status === "Completed"):[];
    const notStartedTasks=tasks?tasks.data.filter((x)=>x.status === "Not Started"):[];
    useEffect(()=>
    
    {
        if(isSuccess)
        console.log("tasks=>",tasks);
    },[tasks])
    return(
        <>
        {isLoading&&!isError&&<h1>Loading...</h1>}
        {isError &&<h1>Error</h1>}
         {isSuccess&&
        <div className="tasks_container">
            <h3>Overview</h3>
            <p>Track your productivity and task completion progress</p>
        <div className="Tasks grid grid-cols-3 gap-4  justify-between">
            <div className="">
                <div className="icon_parent">
                <FontAwesomeIcon icon={faListCheck} className="icon" />
                </div>
                <p>Total Tasks</p>
                <p>{tasks.data.length}</p>
            </div>
            <div className="">
                <div className="icon_parent">
                <FontAwesomeIcon icon={faClock} className="icon"/></div>
                <p>Pending Tasks</p>
                <p>{pendingTasks.length}</p>
            </div>
            <div className="">
                <div className="icon_parent">
               <FontAwesomeIcon icon={faCircleCheck} className="icon"/></div>
                  <p>Completed Tasks</p>
                <p>{completedTasks.length}</p>
            </div>
            <div className="">
                <div className="icon_parent">
              <FontAwesomeIcon icon={faHourglassStart} className="icon" />
               </div>
                  <p>Not Started Tasks</p>
                <p>{notStartedTasks.length}</p>
            </div>
        </div>
        </div>}
        </>
    )
}
export default HomePage;