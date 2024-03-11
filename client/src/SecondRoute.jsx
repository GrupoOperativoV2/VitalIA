import {Navigate, Outlet} from 'react-router-dom'
import jwt from "jsonwebtoken";
function SecondRoute(){
   
   
    if(tipo == "3")return <Navigate to='/paciente/' replace/>;
    if(tipo == "1") return <Navigate to='/tasks/' replace/>;
      return<Outlet/>
    
}
export default SecondRoute