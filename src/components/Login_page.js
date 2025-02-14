import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login_page() {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();


  const validate  = (event) => {
        event.preventDefault();

        const tempErrors = {};      // get this object because we can't assing usestate object directly.

      if(!username.trim()){
            tempErrors.username = "Username cannot be empty";
    }
      else if (username !== "omdev"){
            tempErrors.username = "Invalid username";
      }

      if(!password.trim()){
            tempErrors.password = "password cannot be empty";
      }
      else if(password.length < 6 || password.length > 15){
            tempErrors.password = "password must be within 6-15 characters";
      }
      else if(password !== "omdev@12"){
          tempErrors.password = "Invalid password";
      }

      if(Object.keys(tempErrors).length > 0){
          setError(tempErrors);
          return;
      }

      setIsValid(true);

      localStorage.setItem("username", username);

      setUsername("");
      setPassword("");
      setError({});


      setTimeout(() => {
        navigate("/");        // redirect to news page after successfully login 
        window.location.reload();     //reload the page to reset the app                 
      }, 500);
      

    };


  return (
      
<>

    <h1 className="my-5" style={{textAlign : "center", fontFamily : "sans-serif", fontSize : "60px"}}>
          Login Form </h1>

<form onSubmit={validate}>

  <div className="container my-5"
  style={{width : "500px", height : "350px", margin: "0 auto", border : "2px solid black"}}> 
  <br/> 

    <div className="mb-3 row my-3" style={{marginLeft : "10px"}}>
        <label htmlFor="floatingInput" className="col-sm-2 col-form-label"><strong> Username: </strong> </label>
        <div className="col-sm-10">
        <input className="form-control" type="text" placeholder = "Username" value={username}
        aria-label="default input example" style={{width : "300px", marginLeft: "20px", border : "1px solid black", position : "relative"}}
        onChange={(e)=> setUsername(e.target.value)}/>
        {error.username && <p style={{color : "red", position : "absolute",  marginLeft: "40px"}}> {error.username} </p>} <br/>
        </div>
    </div>

    <div className="mb-3 row" style={{marginLeft : "10px"}}>
      <label htmlFor="inputPassword" className="col-sm-2 col-form-label"><strong> Password: </strong> </label>
      <div className="col-sm-10">
        <input type="password" className="form-control" id="inputPassword" placeholder="Password" 
        style={{width : "300px", marginLeft: "20px", border : "1px solid black", position : "relative"}} 
        value={password} onChange={(e)=> setPassword(e.target.value)}/>
{/* 
        <span id="passwordHelpInline" className="form-text" style={{marginLeft : "10%"}}>
                   Must be 6-15 characters long.
            </span> */}
        {error.password && <p style={{color : "red", position :  "absolute",  marginLeft: "40px"}}> {error.password} </p>}
     </div>
    </div>

    <button className="btn btn-primary" type="submit" disabled={isValid} 
    style={{width : "120px", height : "auto", transform : "translate(170px, 40px)", fontWeight : "bold"}}>
       Login </button> 

       {/* {isValid && <Navigate to={"/"}> </Navigate>}  */}

  </div>

</form>
</>
  );
}

export default Login_page;