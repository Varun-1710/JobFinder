import React, { useContext } from 'react';
import '../styles/JobCard.css';
import { LoginContext } from '../ConextProvider/LoginContext';
import {DataContext} from '../ConextProvider/DataContext';


//We have to add id as the props
function JobCard({
    CurrentJobId,
    CompanyName,
    CompanyLogoURL,
    Position,
    Salary,
    JobType,
    RemoteOrOffice,
    JobLocation,
    Skills,
    
}) {

    const {LoginStatus} = useContext(LoginContext);
    const {HandleJobId} = useContext(DataContext);

    const handleEdit = () =>{
        HandleJobId(CurrentJobId);
        //Then Navigate to edit the job
        const path = `/edit/${CurrentJobId}`;
        <Navigate to={path} />
    }
    return (
        <div className="job-card">
            <div className="job-card-header">
                <img
                    src={CompanyLogoURL}
                    alt={CompanyName}
                    className="company-logo"
                />
                <div className="job-title">
                    <h3>{Position}</h3>
                    <div className="company-info">
                        <span className="salary">₹ {Salary}</span>
                        <span className="location">{JobLocation}</span>
                    </div>
                </div>
            </div>
            <div className="job-card-footer">
                <div className="job-type">
                    <span className="remote-office">{RemoteOrOffice}</span>
                    <span className="job-type-tag">{JobType}</span>
                </div>
                <div className="skills">
                    {Skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                            {skill}
                        </span>
                    ))}
                </div>
                {LoginStatus && 
                    <button onClick={handleEdit} className="view-details-btn">
                    Edit Job</button>
                }
                <button onClick={HandleJobId(CurrentJobId)} className="view-details-btn">
                    View details</button>
            </div>
        </div>
    );
}

export default JobCard;
