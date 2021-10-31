import { useState, useContext } from "react";
import axios from 'axios';
import {Modal} from 'antd';
import {toast} from "react-toastify";
import Link from 'next/link';
import { UserContext } from "../context";
import {useRouter} from "next/router";

import AuthForm from "../components/forms/authform";


const Register = () => {
   
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [secret,setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const[loading,setLoading] = useState(false);
    const [state] = useContext(UserContext);
    const router = useRouter();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
        // console.log(name,email,password,secret);
        setLoading(true);
       const {data} = await axios.post(`/register`,{
            name,
            email,
            password,
            secret,
        });
        // console.log(data)
        if(data.error){
            toast.error(data.error);
            setLoading(false);
        }else{

            setName('');
            setPassword('');
            setEmail('');
            setSecret('');
            setLoading(false);
            setOk(data.ok);
         }
        }catch(error)
        {
            toast.error(error.response.data);
            setLoading(false);
        }
    };

    //if person is loggedin and try to /login manually then redirect to the home page
    if(state && state.token) router.push('/');


    return(
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>Register</h1>
                </div>
            </div>
            
            <div className="row py-5 ">
                <div className="col-md-6 offset-md-3">

                  <AuthForm 
                 
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  secret={secret}
                  setSecret={setSecret}
                  loading={loading}
                  />

                </div>

            </div>
            <div className="row">
                <div className="col">
                    <Modal 
                    title="Congratulations"
                    visible={ok}
                    onCancel={()=>setOk(false)}
                    footer={null}
                    
                    >
                    <p>Your registered sucessfully! Check your mail to activate your account</p>
                    <Link href="/login">
                        <a className="btn btn-primary btn-sm">Login</a>
                    </Link>
                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="text-center">Already register?
                    <Link href="/login">
                    <a>login</a>
                    </Link>
                    </p>
                </div>
            </div>

        </div>
        
        )
};

export default Register;