import { Children, createContext, useContext } from "react";
import { api } from "../apiURl";
const AuthContext = createContext({});
export const AuthProvider= ({children})=>{
    // const[loading,setLoading]=useState(false);
    const Register= async(user)=>
    {
        const response = await  api.post('/api/auth/register',{user})
        return response;
    }
    const Loginfun=async (Email,passWord)=>
    {
        console.log("Email",Email);
        console.log("password",passWord);
        const response =await api.post('/api/auth/login',{email:Email,password:passWord})
        // setLoading=(false);
        return response;
    }
    return(
        <AuthContext.Provider value={{Register,Loginfun}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext);
