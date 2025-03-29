
import './App.css';
import FrontPage from './FrontPage';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import { useState , useParams} from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import OAuthActivation from './OAuthActivation';
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import FileUpload from './FileUpload';
import Dashboard from './Dashboard';
import UserDashboard from './UserDashboard';

function App() {

  

  const PrivateRoutes = () => {
    let authorizationToken = localStorage.getItem('Authorization');
    let adminUser = localStorage.getItem('user');
    let githubLogin = localStorage.getItem('github');
    if((authorizationToken!=null) && adminUser!=null) {
      return <Outlet/>;
    } else {
      return <Navigate to={"/signin"}/>;
    }
  }

  

  // const GithubPrivateRoutes = () => {
  //   let githubLoginCompleted = 
  // }


  return (
      <Routes>
        <Route path='/Welcome' element={<FrontPage/>}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/two_fa_authorization" element={<OAuthActivation/>}/>
        
        <Route element={<PrivateRoutes/>}>
          <Route path='/Dashboard/admin/:admin' element={<Dashboard/>}/>
          <Route path='/Dashboard/user/:user' element={<UserDashboard/>}/>
          <Route path='/fileUpload' element={<FileUpload/>}/>
        </Route>
      </Routes>
  );
}

export default App;
