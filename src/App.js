
import './App.css';
import FrontPage from './FrontPage';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"
import { useState } from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';

function App() {
  const [authenticated, isAuthenticated] = useState(false);

  const Authenticated = () => {
    const location = useLocation();
    if(location.pathname.endsWith('github.com/login/device/success')) {
      isAuthenticated(true);
    }
  }

  // const ProtectedRoute = ({children}) => {
  //   return success ? children : <Navigate to ="/sign_in"/>;
  // }



  return (
      <Routes>
        <Route path='/Welcome' element={<FrontPage/>}></Route>
        
      </Routes>
  );
}

export default App;
