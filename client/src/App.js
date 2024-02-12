import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import { Register } from './components/LoginRegister/Register';
import { Login } from './components/LoginRegister/Login';
import  { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes, Navigate, useNavigate } from 'react-router-dom'
import { Form } from './components/LoginRegister/Form';
import axios from 'axios';
import { Home } from './components/Home';



function App() {
  const [authentication, setAuthentication] = useState();
  const [authenticatedUser, setAuthenticatedUser] = useState()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                setAuthentication={setAuthentication}
                authentication={authentication}
                setAuthenticatedUser={setAuthenticatedUser}
                authenticatedUser={authenticatedUser}
              >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login-register" element={<Form />} />   
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App


export function ProtectedRoute({ children, setAuthentication, authentication, setAuthenticatedUser, authenticatedUser}, props) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem("token");
        let apiRes = await axios.post("http://localhost:8080/api/user/verify-token", "", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(apiRes.data.message);

        if (apiRes.data.message === "Valid JWT Token") {
          console.log("valid");
          setAuthenticatedUser(apiRes.data)
          console.log(authenticatedUser)
          setAuthentication(true);
        } else {
          setAuthentication(false);
          setAuthenticatedUser(apiRes.data)
          navigate("/")
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setAuthentication(false);
      } finally {
        setLoading(false); // Set loading to false after the authentication check
      }
    };

    fetchData();
  }, [setAuthentication || authenticatedUser]);

  if (loading) {
    // Return loading indicator or null while authentication check is in progress
    return null;
  }

  return authentication ? children : <Navigate to="/login-register" />;
}


