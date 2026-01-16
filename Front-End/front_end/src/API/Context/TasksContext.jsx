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
        setLoading(false); 
        return; 
    }

                console.log("user=>",user)
                 api.get('/api/tasks/',{
                      withCredentials: true
                 }).then(res=> setTasks(res.data.data)).catch((error)=>setError(error)).finally(()=> setLoading(false))
          
                
                //  setTasks(response.data.tasks)
      
    },[user])
    return(
        <context.Provider value={{tasks,loading,Error}}>
                {children}
        </context.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useTasks=()=>useContext(context)