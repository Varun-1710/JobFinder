import React,{useContext} from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../ConextProvider/LoginContext";

const NavBar = () =>{
    const [LoginStatus,handleLogout] = useContext(LoginContext);
     
    return(
        <div className="navigation">
            <div>JobFinder</div>
            <div>
                {!LoginStatus && 
                    <div>
                        <button onClick={<Navigate to='/login'/>}>Log In</button>
                        <button onClick={<Navigate to='/sign'/>}>Register</button>
                    </div>
                }

                {LoginStatus && 
                    <div>
                        <button onClick={handleLogout}>Log Out</button>
                        <button>Hello Recruiter</button>
                        <img src='' alt='img' height={'4px'} width={'4px'} />
                    </div>
                }
                
            </div>
        </div>
    )
}

export default NavBar;