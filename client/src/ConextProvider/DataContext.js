import { useState, useEffect,createContext, useContext} from "react";
import axios from 'axios';
import { LoginContext } from "./LoginContext";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [JobsData,setJobsData] = useState([]);
    const [JobId,setJobId] = useState('');
    const {LoginStatus} = useContext(LoginContext);

    const HandleJobId = (jobId) => {
        setJobId(jobId);
    }

    if(LoginStatus){
        HandlegetJobs();
    }
    else{
        HandlegetAllJobs();
    }
    
    const HandlegetAllJobs = async() =>{
        try{
            const response = await axios.get('http://localhost:5000/api/Main');
            setJobsData(response.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const HandlegetJobs = async() =>{
        const token = localStorage.getItem('token') || '';
        
        try{
            const response = await axios.get('http://localhost:5000/api/Job',{'auth-token':{token}});
            setJobsData(response.data);
        }

        catch(err){
            console.log(err);

        }
    }

    const HandleAddJob = async (CurrentJob) =>{

        const token = localStorage.getItem('token') || '';
        
        try{
            const response = await axios.post('http://localhost:5000/api/Job',CurrentJob,{'auth-token':{token}});
            setJobsData(response.data);
        }

        catch(err){
            console.log(err);

        }

    }

    const HandleEditJob = async (CurrentJob) => {

        const token = localStorage.getItem('token') || '';
        try {
            const response = await axios.put(`http://localhost:5000/api/Job/:${JobId}`,CurrentJob,{'auth-token':{token}});
            setJobsData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <DataContext.Provider value={{JobsData,JobId,HandleJobId,HandleAddJob,HandleEditJob}}>
            {children}
        </DataContext.Provider>
    )

}