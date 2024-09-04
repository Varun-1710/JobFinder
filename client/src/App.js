import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignIn from './Components/SignIn';
import Login from './Components/Login';
import JobForm from './Components/JobForm';
import { DataProvider } from './ConextProvider/DataContext';
import { LoginProvider } from './ConextProvider/LoginContext';
import MainPage from './Components/MainPage';
import EditJob from './Components/EditJob';

function App() {

  
  return (
    <div>
      <BrowserRouter>
        <Routes>
         <Route path = '/sign' element = {<SignIn />} />
         <LoginProvider>
            <Route path='/login' element={<Login />} />
            <DataProvider>
              <Route path = '/' element = {<MainPage />} /> 
              <Route path = '/AddJob' element = {<JobForm />} />
              <Route path = '/edit/:jobId' element = {<EditJob />} />
              <Route path = '*' element = {<h1>404 Not Found</h1>} />
            </DataProvider>
         </LoginProvider>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
