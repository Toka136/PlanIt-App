import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../apiURl";
import { useAuth } from "./AuthContext";

const context=createContext({});
export const TasksProvider=({children})=>
{
    const [tasks,setTasks]=useState([]);
    const[loading,setLoading]=useState(true);
    const[Error,setError]=useState(null);
    const {user}=useAuth();
    useEffect(()=>
    {
        console.log("user=>>.",user)
         if (!user) {
            console.log("no user")
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false); 
        return; 
    }

                console.log("user=>",user)
                 api.get('/api/tasks/',{
                      withCredentials: true
                 }).then(res=> setTasks(res.data.data)).catch((error)=>setError(error)).finally(()=> setLoading(false))
          
                
                //  setTasks(response.data.tasks)
      
    },[user])
    const updateTask= async (body)=>
    {
        try
        {
        const res = await api.patch(`/api/tasks/${body._id}`,body,{
            withCredentials:true
        })
         setTasks(prevTasks => 
      prevTasks.map(task => task._id === body._id ? { ...task, ...res.data.data} : task)    );
        }catch(e)
        {
            console.log("error in update task",e)
            setError(e)
        }
    console.log("Provider State:", tasks)
    }
    const addTask= async(body)=>
    {
         api.post('/api/tasks/',{body},{
            withCredentials : true
        }).then(res=> setTasks([...tasks,res.data.data]) ).catch(err=>setError(err)).finally(()=>setLoading(false))
    }
    const deleteTask=async(id)=>
    {
        api.delete(`/api/tasks/${id}`,{
            withCredentials : true
        }).then(res=>setTasks([...tasks.filter(task=>task._id!==id)])).catch(err=>setError(err)).finally(()=>setLoading(false))
    }
    return(
        <context.Provider value={{tasks,loading,Error,updateTask,addTask,deleteTask}}>
                {children}
        </context.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useTasks=()=>useContext(context)