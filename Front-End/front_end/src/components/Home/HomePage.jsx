import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Cell, Pie, PieChart, Tooltip} from "recharts"
import { faCircleCheck, faCirclePlay, faHourglassStart, faListCheck } from '@fortawesome/free-solid-svg-icons';
import '../componentsCss/Tasks.css'
import TasskAnalysis from "./TasksAnalysis";
// import { useEffect } from "react";
function HomePage()
{
  
   const tasks=[{
    id: 1, title: 'Prepare presentation slides', desc: 'Create slides for the quarterly review meeting', priority: 'High', date: 'Nov 29', status: 'In Progress' },
    { id: 2, title: 'Review pull requests', desc: 'Review and merge pending PRs from the team', priority: 'Medium', date: 'Nov 30', status: 'Not Started' },
    { id: 3, title: 'Update dependencies', desc: 'Upgrade dependencies to the latest versions', priority: 'Low', date: 'Dec 1', status: 'Completed' },];
    const activeTasks=tasks?tasks.data.filter((x)=>x.status === "In Progress"):[];
    const completedTasks=tasks?tasks.data.filter((x)=>x.status === "Completed"):[];
    const pendingTasks=tasks?tasks.data.filter((x)=>x.status === "Not Started"):[];
     const temp_data=tasks?[
        {name:"pendingTasks",value:pendingTasks.length},
        {name:"completedTasks",value:completedTasks.length},
        {name:"activeTasks",value:activeTasks.length},
    ]:[];
    const Colors=["#9ca3af","#10b981","#3b82f6"]
    return(
        <>
      
       
         <div>
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
                    <FontAwesomeIcon icon={faHourglassStart} className="icon" />
                </div>
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
                  <FontAwesomeIcon icon={faCirclePlay} />

               </div>
                  <p>active Tasks</p>
                <p>{activeTasks.length}</p>
            </div>
        </div>
        </div>
        <div className="analysis" >
           
            <div   className="chart max-w-md mx-auto bg-white rounded-3xl p-8 shadow-sm border border-gray-100 font-sans text-slate-700">
                 <h2 className="text-xl font-semibold mb-8 text-slate-900">Task Distrubtion</h2>
            <PieChart width={400} height={300} className="mt-15">
                <Pie data={temp_data} dataKey="value" label>
                {temp_data.map((entry,indx)=>(
                    <Cell key={`cell-${indx}`} fill={Colors[indx]}></Cell>
                ))}</Pie>
                <Tooltip/>
            </PieChart>
            <div className="chart_info">
                <p className="completed">Completed</p>
                <p className="pending">pending</p>
                <p className="active">active</p>
            </div>
            </div>
            <div
            className="analysis_info">
                <TasskAnalysis />
            </div>
        </div>
        </div>
        
        </>
    )
}
export default HomePage;