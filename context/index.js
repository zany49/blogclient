import {useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";



const UserContext = createContext();

//this file is after creating jwt token access so that every page has acess of user auth
const UserProvider=({ children })=>{
    const[state,setState] = useState({
        user:{},
        token:"",
    });

    useEffect(()=>{
    setState(JSON.parse(window.localStorage.getItem("auth"))); //parse is used to convert the json datato jsobject
     
    },[])

    const router = useRouter();

     //to set base url to access  and headers
    const token = state && state.token ? state.token : "" ;
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

 
    //to force logout in expiring of jwt
    axios.interceptors.response.use(
        function(response) {
            return response;
        
    }, 
    function(error){

        let response= error.response;
        if(response.status === 401 && response.config && !response.config.__isRetryRequest){
            setState(null);
            window.localStorage.removeItem("auth");
            router.push("/login");
        }
    
}

    );



    return(
        <UserContext.Provider value={[state , setState]}>
        {children}
        </UserContext.Provider>
    )


}

export {UserContext, UserProvider}