import './App.css';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, routes } from './routes';
import AppLayout from './Layouts/AppLayout';
import { useEffect, useState } from 'react';
import AuthLayout from './Layouts/AuthLayout';
import firebaseSDK from './firebase/firebase.config';
import SplashScreen from './Pages/SplashScreen';
import { setUser } from './redux/actions';
import getInitialStates from './initialStates';
import RouteNotFound from './components/specials/RouteNotFound';

function App() {

const [user, setuser]= useState("check-state");
const dispatch=useDispatch();


const checkAuth=async(res)=>{
   if(res?.uid){
     let userId =res.uid;
            let user = (await firebaseSDK.firestore.collection("Users").doc(userId).get()).data();
            console.log("firebase user",user)
          setuser(user);
          dispatch(setUser(user));
          getInitialStates(dispatch,user);
        


   }
  else {
     setuser(null);
  }
}

console.log("user",user);

useEffect(()=>{
  firebaseSDK.auth.onAuthStateChanged((res)=>{
   checkAuth(res)
  })
},[])



  return (
  
      <div className="App">
           <Routes>
       { user==="check-state"?<Route path='*' element={<SplashScreen/>}/>:
        user?._id? <Route path='/' element={<AppLayout onLogout={()=>setuser(null)}/>}>
         {routes?.map((item,index)=>{
          let Component=item?.Component;
          return (<Route key={item?.path} path={item.path} element={<Component/>}/>)

         })}
         <Route path='*' element={<RouteNotFound/>}/>
        </Route>:<Route path='/' element={<AuthLayout/>}>
        {authRoutes?.map((item,index)=>{
          let Component = item?.Component;
          return(<Route key={item?.path} path={item.path} element={<Component  onAuthSuccess={(u)=>{
            console.log("User-Logged in",u);
            setUser(u)
          }}/>}/>)
        })}
        </Route>
       }
    <Route path='*' element={<RouteNotFound/>}/>
      </Routes>
      </div>
   
  );
}

export default App;
