import { useState, createContext} from "react";
import axios from 'axios';


export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const [LoginStatus,setloginStatus] = useState(false);
    

    const handleLogin = async (Email,Password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                Email,
                Password
            });
            const token = response.data.Token;
            localStorage.setItem('token', token);
            setloginStatus(true);
        } catch (error) {
            console.log(err);

        }
    }

    const handleLogout = async () =>{
        localStorage.removeItem('token');
        setloginStatus(false);
       
    }

    return (<LoginContext.Provider value={{LoginStatus,handleLogin,handleLogout}}>{children}</LoginContext.Provider>);
}