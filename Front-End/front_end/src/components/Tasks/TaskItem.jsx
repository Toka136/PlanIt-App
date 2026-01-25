import { faCalendarAlt, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTasks } from "../../API/Context/TasksContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
 function TaskItem  ({ task })  {
    console.log("task child",task)
  const priorityStyle = {
    High: "bg-red-50 text-red-600 border-red-100",
    Medium: "bg-amber-50 text-amber-600 border-amber-100",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };
//   
  const {updateTask,deleteTask}=useTasks();
  const[changeMode,setChangeMode]=useState(false);
 
   const schema=Yup.object({
    title:Yup.string().required("Title is required"),
    description:Yup.string().required("Description is required"),
    dueDate:Yup.date().required("Due date is required").min(new Date(), "Due date must be in the future"),
    priority:Yup.string().required("Priority is required"),
    status:Yup.string().required("Status is required"),
   })
  const form=useFormik({
  
    
    initialValues: {
      title: task?.title,
      description: task?.description,
      dueDate: task?.dueDate,
      priority: task?.priority,
      status: task?.status,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      changeTask(values);
    },
  })
 const  changeTask=async(values)=>
  {
    console.log("task.status",task.priority)
      await updateTask({...task,...values})
      setChangeMode(false)
  } 
  const handleDelete=async()=>
  {
      await deleteTask(task._id)
  }
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
      {changeMode?<form onSubmit={form.handleSubmit} className="text-start grid grid-cols-2 gap-2 wrap-normal">
        <input
          type="text"
          name="title"
          id="title"
          value={form.values.title}
          onChange={form.handleChange}
         
          className=" border border-slate-200 rounded-[10px] p-2 mb-4 "
        />
        {form.errors.title && form.touched.title && (
          <p className="text-red-500">{form.errors.title}</p>
        )}
        <input
          type="text"
          name="description"
          id="description"
          value={form.values.description}
          onChange={form.handleChange}
          className=" border border-slate-200 rounded-[10px] p-2 mb-4 "
        />
        {form.errors.description && form.touched.description && (
          <p className="text-red-500">{form.errors.description}</p>
        )}
        {console.log("task.dueDate",task.dueDate)}
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          placeholder={form.values.dueDate}
          value={form.values.dueDate.split("T")[0]}
          onChange={form.handleChange}
          className=" border border-slate-200 rounded-[10px] p-2 mb-4 "
        />
        {form.errors.dueDate && form.touched.dueDate && (
          <p className="text-red-500">{form.errors.dueDate}</p>
        )}
        <div className="flex justify-start gap-5 mb-4 ">
        <select  className="w-50 border-2 border-slate-200 rounded-xl px-4 py-2 mr-3 " value={form.values.priority} onChange={(e) => form.setFieldValue("priority", e.target.value) } onBlur={()=>form.setFieldTouched('priority',true)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select className="w-50 border-2 border-slate-200 rounded-xl p-2 mr-3 " value={form.values.status} onChange={(e) => form.setFieldValue("status", e.target.value) } onBlur={()=>form.setFieldTouched('status',true)}>
          <option value="Completed">Completed</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">Active</option>
        </select>
        </div>
        <div className="flex justify-start gap-5">
          <button onClick={()=>setChangeMode(false)} className="bg-slate-100 text-slate-600 text-bold! text-xl! px-8 py-2 rounded-[5px]! hover:bg-slate-200">Cancel</button>
        <button type="submit" className="bg-blue-500 text-white text-bold! text-xl! px-8 py-2 rounded-[5px]! hover:bg-blue-600">Save</button>
      </div></form>:<div>
      <div className="flex justify-end items-center  mt-4">
        <button onClick={()=>setChangeMode(true)} className="text-slate-400 hover:text-slate-600  px-2 py-2 rounded-xl!">Edit the Task <FontAwesomeIcon icon={faPen} size="sm" /></button>
      </div>
      <div className="flex gap-5">
        {/* Status Circle */}
        <div className=" mt-1" >
          <div className={`w-6 h-6 rounded-full border-2 flex   ${task.status === 'In Progress' ? 'border-blue-500' : 'border-slate-300'}`}>
            {task.status === 'In Progress' ? <div className="w-full h-full bg-blue-500 rounded-full" />:task.status==="Completed"?<div className="w-full h-full bg-[#009966] rounded-full" />:<div className="w-full h-full bg-slate-300 rounded-full" />}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-slate-800 tracking-tight">{task.title}</h3>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-slate-400 hover:text-slate-600"><FontAwesomeIcon icon={faPen} size="sm" /></button>
              <button className="text-slate-400 hover:text-red-500"><FontAwesomeIcon icon={faTrash} size="sm" /></button>
            </div>
          </div>
          <p className="text-slate-500 mt-1 mb-4 leading-relaxed text-start text-xl">{task.description}</p>
          
          <div className="flex items-center gap-3">
            <span   className={` text-xs font-bold px-4 py-1.5 rounded-full border ${priorityStyle[task.priority]}`}>
              {task.priority}
            </span>
            <span className={`flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full ${priorityStyle[task.priority]}`}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {task.dueDate.split('T')[0]}
            </span>
             {/* <span className={` text-xs font-bold px-4 py-1.5 rounded-full border ${priorityStyle[task.priority]}`}>
              {task.status}
            </span> */}
          </div>
          <div className="flex items-center justify-end gap-3! mt-3">
            <button onClick={handleDelete} className="rounded-xl! bg-red-500 text-white px-4 py-1.5 capitalize! hover:bg-red-600">delete task</button>
          </div>
        </div>
      </div>
      </div>}
 
    </div>
  );
};
export default TaskItem