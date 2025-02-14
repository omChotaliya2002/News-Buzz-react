import React, { Children, useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router,Route, Routes, Navigate, useLocation} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Login_page from './components/Login_page';


const App = () => {

  const apiKey = process.env.REACT_APP_NEWS_API;

const [progress, setProgress] = useState(0); 


// function to check if user is logged in : 
const isAuthenticated = () => localStorage.getItem("username") !== null;
  
  
    return (
      <div>
              <Router>

                  <Layout isAuthenticated = {isAuthenticated()}> 

                  <LoadingBar
                    color="#f11946"
                    height={4}
                    progress={progress}
                    /> 
      

                  <Routes>

                    <Route path="/login" element = {<Login_page/>} />

                    {/* after login redirected here to "/" */}
                    <Route path="/" element={isAuthenticated() ? <News setProgress={setProgress} key="sports" pageSize={9} country="us" category="sports"/> : <Navigate to = "/login"/> }/>

                    <Route exact path="/business" element={isAuthenticated() ? <News setProgress={setProgress} apiKey = {apiKey} key="business" pageSize={9} country="us" category="business"/> 
                    : <Navigate to = "/login"/>}/>

                    <Route exact path="/entertainment" element={isAuthenticated () ? <News setProgress={setProgress} apiKey = {apiKey} key="entertainment" pageSize={9} country="us" category="entertainment"/>
                    : <Navigate to = "/login"/>}/>

                    <Route exact path="/general" element={isAuthenticated() ? <News setProgress={setProgress} apiKey = {apiKey} key="general" pageSize={9} country="us" category="general"/>
                    : <Navigate to = "/login"/>}/>

                    <Route exact path="/health" element={isAuthenticated() ? <News setProgress={setProgress} apiKey = {apiKey} key="health" pageSize={9} country="us" category="health"/>
                    : <Navigate to = "/login"/>}/>

                    <Route exact path="/science" element={isAuthenticated() ? <News setProgress={setProgress} apiKey = {apiKey} key="science" pageSize={9} country="us" category="science"/>
                    : <Navigate to = "/login"/>}/>

                    <Route exact path="/sports" element={isAuthenticated() ? <News setProgress={setProgress} apiKey = {apiKey} key="sports" pageSize={9} country="us" category="sports"/>
                    : <Navigate to = "/login"/>}/>

                    <Route exact path="/technology" element={isAuthenticated() ? <News setProgress={setProgress} apiKey = {apiKey} key="technology" pageSize={9} country="us" category="technology"/>
                    : <Navigate to = "/login"/>}/>

                    <Route path="*" element={<Navigate to="/login"/>}/>   {/*sending Unknown path to login*/}

                  </Routes>
                </Layout>
            </Router>
      </div>
    );
};

  // layout component to conditionlly show Navbar : 

  const Layout = ({isAuthenticated, children}) => {
      const location = useLocation();             // gives the current location
      
      return(
        <>
            {isAuthenticated && location.pathname !== "/login" && <Navbar/>}
            {children}
        
        </>
      );
  };

export default App;        