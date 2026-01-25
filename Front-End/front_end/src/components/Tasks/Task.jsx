import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faSearch, 

  faCircleQuestion 
} from '@fortawesome/free-solid-svg-icons';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, ToggleButtonGroup, ToggleButton, Typography, IconButton 
} from '@mui/material';
import { useTasks } from '../../API/Context/TasksContext';
import TaskItem from './TaskItem';
import { AddTaskModal } from './TaskCreation';
import { useMemo } from 'react';

const Task = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Example state based on your screenshots
    const {tasks,loading,Error}=useTasks();
      console.log("Component Rendered, tasks:", tasks)
    const activeTasks=tasks?tasks.filter((x) => x.status === "In Progress"):[];
    const [taskName,setTaskName]=useState('');
    const [category,setCategory]=useState('all');
    //   const handleSearch=()=>
    // {
    //    const temp=tasks.filter((x) => x.title.toLowerCase().includes(taskName.toLowerCase()));
    //    setshownTasks(temp);
    // }
    // useEffect(()=>
    // {

    //   handleSearch();
    // },[taskName])
  
    const shownTasks = useMemo(() => {
      let temp=tasks;
  if (category === "all") temp = tasks;

 else  if (category === "priority") {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    console.log("priorityOrder")
    temp= [...tasks].sort((a, b) => 
      (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
    );
  }
  else if(category==="date")
    temp=[...tasks].sort((a,b)=> new Date(a.dueDate)-new Date(b.dueDate));
  if(taskName)
  {
    temp=tasks.filter((x) => x.title.toLowerCase().includes(taskName.toLowerCase()));
  }

  return temp;
}, [category, tasks,taskName]);
  return (
    <>
    {
      loading?<h1>Loading...</h1>:Error?<h1>Error</h1>:
      <>
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-slate-700">
      <div className="max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
            <p className="text-slate-500 mt-1">{activeTasks.length} active tasks</p>
          </div>
          <button 
            onClick={() =>{console.log("clicked");setIsModalOpen(true)}
            }
            className="flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-5 py-2.5 rounded-xl transition-all shadow-sm font-semibold"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Task
          </button>
          <AddTaskModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="relative flex-1 min-w-62.5">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              onChange={(e)=>setTaskName(e.target.value)} 
              placeholder="Search tasks..." 
              className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
         
          <select onChange={(e)=>setCategory(e.target.value)} className="border border-slate-200 rounded-xl px-4 py-2.5 bg-white outline-none min-w-35">
            <option value={"date"}>Sort by Date</option>
            <option value={"priority"}>Sort by Priority</option>
              <option value={'all'}>All Tasks</option>
          </select>
        </div>

        <div className="space-y-4">
          {console.log("shownTasks",shownTasks)}
          {shownTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>

      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}
      
     
    </div></>
    }</>
  
  );
};





export default Task;