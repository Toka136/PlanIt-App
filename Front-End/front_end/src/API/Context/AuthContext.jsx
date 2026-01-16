import { Children, createContext, useContext, useEffect, useState } from "react";
import { api } from "../apiURl";
const AuthContext = createContext({});
export const AuthProvider= ({children})=>{
    const[loading,setLoading]=useState(true);
    const[user,setUser]=useState(null);
  const [userId, setUserID] = useState(() => {
    const savedId = localStorage.getItem("userId");
    try {
        return savedId ? JSON.parse(savedId) : null;
    } catch (e) {
        console.log("e=>",e)
        return null;
    }
});
   useEffect(() => {
    // 2. هذه الدالة ستنفذ عند الـ Refresh (لأن userId سيأخذ قيمته الابتدائية من التخزين)
    // وستنفذ أيضاً بعد الـ Login بمجرد أن تقوم بعمل setUserID(newId)
    
    if (userId) {
        console.log("Fetching data for userId:", userId);
        
        api.get(`/api/users/${userId}`, {
            withCredentials: true
        })
        .then((res) => {
            setUser(res.data.data);
        })
        .catch((err) => {
            console.error("API Error:", err);
        }).finally(()=>setLoading(false));
    }else
    {
        setLoading(false);
    }
}, [userId]);
    const Registerfun= async(user)=>
    {
        console.log("user",user)
        const response = await  api.post('/api/auth/register',user)
         setLoading(false);
        return response;
    }
    const Loginfun=async (Email,passWord)=>
    {
        localStorage.removeItem("userId");
        const response =await api.post('/api/auth/login',{email:Email,password:passWord},{
            withCredentials: true
        })
        setLoading(false);
        console.log("response=>>>>",response.data.data.id)
        localStorage.setItem("userId",JSON.stringify(response.data.data.id));
        setUserID(response.data.data.id);
        return response;
    }
    return(
        <AuthContext.Provider value={{Registerfun,Loginfun,loading,user}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext);
