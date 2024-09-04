import React, { useState,useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../ConextProvider/LoginContext';
import { DataContext } from '../ConextProvider/DataContext';

function JobForm() {

    const {LoginStatus} = useContext(LoginContext);
    const {HandleAddJob} = useContext(DataContext);

    if(!LoginStatus){
        <Navigate to='/login'/>
    }
    const [formData, setFormData] = useState({
        CompanyName: '',
        CompanyLogoURL: '',
        Position: '',
        Salary: '',
        JobType: '',  // default value
        RemoteOrOffice: '',  // default value
        JobLocation: '',
        Description: '',
        Skills: [],
        AboutCompany: '',
        Information: ''
    });

    const [errors, setErrors] = useState({});

    const skillsOptions = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'CSS', 'HTML']; // Example skills

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const addSkill = (skill) => {
        setFormData((prevData) => ({
            ...prevData,
            Skills: [...prevData.Skills, skill],
        }));
    };

    const removeSkill = (skill) => {
        setFormData((prevData) => ({
            ...prevData,
            Skills: prevData.Skills.filter((s) => s !== skill),
        }));
    };

    const handleSkillChange = (e) => {
        const skill = e.target.value;
        if (skill && !formData.Skills.includes(skill)) {
            addSkill(skill);
        }
    };

    const validate = () => {
        const errors = {};

        for (const [key, value] of Object.entries(formData)) {
            if (key !== 'Skills' && value.trim() === '') {
                errors[key] = `${key} cannot be empty`;
            } else if (key === 'Skills' && value.length === 0) {
                errors[key] = 'Skills cannot be empty';
            }
        }

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();

        if (Object.keys(errors).length === 0) {
            HandleAddJob(formData);
        } else {
            setErrors(errors);
            console.log("Complete the fields");
        }
    }

    return (
        <div className='main-container'>
            <div className='details-container'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                type='text'
                                name='CompanyName'
                                placeholder='Company Name'
                                value={formData.CompanyName}
                                onChange={handleChange}
                            />
                            {errors.CompanyName && <p>{errors.CompanyName}</p>}
                        </div>
                        <div>
                            <input
                                type='text'
                                name='CompanyLogoURL'
                                placeholder='Company Logo URL'
                                value={formData.CompanyLogoURL}
                                onChange={handleChange}
                            />
                            {errors.CompanyLogoURL && <p>{errors.CompanyLogoURL}</p>}
                        </div>
                        <div>
                            <input
                                type='text'
                                name='Position'
                                placeholder='Position'
                                value={formData.Position}
                                onChange={handleChange}
                            />
                            {errors.Position && <p>{errors.Position}</p>}
                        </div>
                        <div>
                            <input
                                type='text'
                                name='Salary'
                                placeholder='Salary'
                                value={formData.Salary}
                                onChange={handleChange}
                            />
                            {errors.Salary && <p>{errors.Salary}</p>}
                        </div>
                        <div>
                            <select
                                name='JobType'
                                value={formData.JobType}
                                onChange={handleChange}
                            >
                                <option value='' disabled>Select Job Type</option>
                                <option value='Full-time'>Full-time</option>
                                <option value='Part-time'>Part-time</option>
                            </select>
                            {errors.JobType && <p>{errors.JobType}</p>}
                        </div>
                        <div>
                            <select
                                name='RemoteOrOffice'
                                value={formData.RemoteOrOffice}
                                onChange={handleChange}
                            >
                                <option value='' disabled>Select Work Type</option>
                                <option value='Remote'>Remote</option>
                                <option value='Office'>Office</option>
                            </select>
                            {errors.RemoteOrOffice && <p>{errors.RemoteOrOffice}</p>}
                        </div>
                        <div>
                            <input
                                type='text'
                                name='JobLocation'
                                placeholder='Job Location'
                                value={formData.JobLocation}
                                onChange={handleChange}
                            />
                            {errors.JobLocation && <p>{errors.JobLocation}</p>}
                        </div>
                        <div>
                            <input
                                type='text'
                                name='Description'
                                placeholder='Job Description'
                                value={formData.Description}
                                onChange={handleChange}
                            />
                            {errors.Description && <p>{errors.Description}</p>}
                        </div>
                        <div>
                            <input
                                type='text'
                                name='Skills'
                                placeholder='Skills'
                                onChange={handleSkillChange}
                                list='skills-list'
                            />
                            <datalist id='skills-list'>
                                {skillsOptions.map((skill, index) => (
                                    <option key={index} value={skill} />
                                ))}
                            </datalist>
                            <div>
                                {formData.Skills.map((skill, index) => (
                                    <div key={index}>
                                        {skill} <button type='button' onClick={() => removeSkill(skill)}>X</button>
                                    </div>
                                ))}
                            </div>
                            {errors.Skills && <p>{errors.Skills}</p>}
                        </div>
                        <div>
                            <input
                                type='text'
                                name='AboutCompany'
                                placeholder='About Company'
                                value={formData.AboutCompany}
                                onChange={handleChange}
                            />
                            {errors.AboutCompany && <p>{errors.AboutCompany}</p>}
                        </div>
                        <div>
                            <input
                                type='text'
                                name='Information'
                                placeholder='Additional Information'
                                value={formData.Information}
                                onChange={handleChange}
                            />
                            {errors.Information && <p>{errors.Information}</p>}
                        </div>
                        <div>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default JobForm;
