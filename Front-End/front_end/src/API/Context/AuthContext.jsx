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
const findUser=(userId)=>
{
 if (userId) {
        console.log("Fetching data for userId:", userId);
        
        api.get(`/api/users/${userId}`, {
            withCredentials: true
        })
        .then((res) => {
            setUser(res.data.data.user);
        })
        .catch((err) => {
            console.error("API Error:", err);
        }).finally(()=>setLoading(false));
    }else
    {
                // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
    }
}
   useEffect(() => {
   findUser(userId);
    
   
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
        findUser(response.data.data.id);
        return response;
    }
    const Logoutfun=()=>
    {
        localStorage.removeItem("userId");
        setUserID(null);
        setUser(null);
    }
    const UpdateUser=async (newUser,id)=>
    {
        console.log("newUser",newUser
        )
        console.log("id",id
        )
        if(newUser.get("userName")!==user.userName)
        {
            console.log("must change userName",newUser.get('userName'))
            api.patch(`/api/users/username/${id}`,{userName:newUser.get('userName')},{
                withCredentials: true
            }).then(()=>setUser((prevUser) => ({ ...prevUser, userName: newUser.get('userName') }))).catch(err=>console.log(err)).finally(()=>setLoading(false))
        }
        if(newUser.get("password")&&newUser.get("currentPassword"))
        {
            console.log("must change password")
            api.patch(`/api/users/password/${id}/`,{password:newUser.get("password"),currentPassword:newUser.get("currentPassword")},{
                withCredentials: true
            }).then(()=>setUser((prevUser) => ({ ...prevUser, password: newUser.password }))).catch(err=>console.log(err)).finally(()=>setLoading(false))
        }
        // console.log("newUser.get('avatar')",newUser.get('avatar'))
        if(newUser.get('avatar')!==user.avatar)
        { 
            const formData = new FormData();
            formData.append('avatar', newUser.get('avatar'));
            console.log("must change avatar",newUser.get('avatar'))
            api.patch(`/api/users/avatar/${id}`,formData,{
                withCredentials: true
            }).then(res=>setUser((prevUser) => ({ ...prevUser, avatar: res.data.data }))).catch(err=>console.log(err)).finally(()=>setLoading(false))
        }
        
    }
    return(
        <AuthContext.Provider value={{Registerfun,Loginfun,loading,user,Logoutfun,UpdateUser}}>
            {children}
        </AuthContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth=()=>useContext(AuthContext);
