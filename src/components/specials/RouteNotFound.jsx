import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


const RouteNotFound = () => {
const navigateTo=useNavigate();


useEffect(()=>{
    let timeOut=setTimeout(()=>{
        navigateTo("/")
    },3000)

    return ()=>clearTimeout(timeOut);
},[])


  return (
    <div>
        <h1>404 Notfound</h1>
        <p>Will be taking you to home shortly</p>
    </div>
  )
}

export default RouteNotFound