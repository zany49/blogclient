import { useState, useEffect , useContext } from 'react';
import axios from "axios";
import {useRouter} from 'next/router';
import { SyncOutlined } from '@ant-design/icons';
import { UserContext } from '../../context';

 const UseRoute = ({children}) => {
    const [ok, setOK]= useState(false);
    const [state]= useContext(UserContext);
    const router = useRouter();
    
    useEffect(()=>{
      if (state && state.token)  getCurrentUser()
    },[state && state.token]);

    const getCurrentUser = async () => {
        try{
            //header and base url in index.js as default 
            
        //     headers:{
        //         "Authorization":`Bearer ${state.token}`,
        //     }
        // }
            const {data} =await axios.get(`/current-user`);
            if(data.ok) setOK(true);
        }catch(err){
            router.push('/login');
        }
    }

    //to redirect it there is no jwt authentication in 1s
    process.browser && state === null && setTimeout(() => {
        getCurrentUser();
    },1000);
     
    return !ok ? (<SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5"
    />
    ) : (
       <> {children}</>
        )



}

export default UseRoute;