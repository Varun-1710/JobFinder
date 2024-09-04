import React, {useContext} from 'react';
import { DataContext } from '../ConextProvider/DataContext';
import NavBar from './Navbar';
import JobCard from './JobCard';


function MainPage(){
    const {JobsData} = useContext(DataContext);
    
    return (
        <div>
            <NavBar />
            <div className='filter'></div>
            <div className='card-container'>
                {JobsData.map((item,index)=>{
                    return <JobCard 
                    CurrentJobId = {item._id}
                    CompanyName = {item.CompanyName}
                    CompanyLogoURL = {item.CompanyLogoURL}
                    Position = {item.Position}
                    Salary = {item.Salary}
                    JobType = {item.JobType}
                    RemoteOrOffice = {item.RemoteOrOffice}
                    JobLocation = {item.JobLocation}
                    Skills = {item.Skills}
                    />
                })}
            </div>
        </div>
    )
};

export default MainPage;