
import "./App.css";
import React from "react";
import {Routes,Route} from 'react-router-dom'
import Home from "./components/pages/Home";
import View from "./components/student/View"
import Edit from "./components/student/Edit"


function App()
{
 
  return(

    <div className="App">
      
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/view/:id" element={<View/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
      
    
    </div>
  ); 
}




export default App;
