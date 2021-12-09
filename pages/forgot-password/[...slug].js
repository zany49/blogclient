import { useState, useContext } from "react";
import axios from 'axios';
import {Modal} from 'antd';
import {toast} from "react-toastify";
import Link from 'next/link';
import { UserContext } from "../../context";
import {useRouter} from "next/router";

import ForgotPasswordForm from "../../components/forms/forgotpassform";
import {Card} from 'antd';

const ForgotPassword = () => {
   
    
    const [email,setEmail] = useState("");
    const [newpassword,setNewPassword] = useState("");
    const [secret,setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const[loading,setLoading] = useState(false);
    const [state] = useContext(UserContext);



    const router = useRouter();
    const { slug } = router.query;
    // console.log(slug);
    // console.log(slug[0]);
    // console.log(slug[1]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // console.log(name, email, password, secret);
          setLoading(true);
          const { data } = await axios.post(`/forgot-password/${slug[0]}/${slug[1]}`, {
            email,
            newpassword,       
          });
      
          // console.log("forgot password res => ", data);
      
          if (data.error) {
            toast.error(data.error);
            setLoading(false);
          }
      
          if (data.success) {
            setEmail("");
            setNewPassword("");
          
            setOk(true);
            setLoading(false);
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };

    //if person is loggedin and try to /login manually then redirect to the home page
    if(state && state.token) router.push('/');


    return(
        <div className="container-fluid">
          
            
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                <Card hoverable>
         <div className="row">
                        <div className="">
                            <h4 className="d-flex justify-content-center">RESET-PASSWORD</h4>
                            <hr />
                        </div>

                    </div>

                  <ForgotPasswordForm
                  handleSubmit={handleSubmit}
                  email={email}
                  setEmail={setEmail}
                  newpassword={newpassword}
                  setNewPassword={setNewPassword}
                  loading={loading}
                  />
                  </Card>
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
                    <p>Password Updated </p>
                    <Link href="/login">
                        <a className="btn btn-primary btn-sm">Login</a>
                    </Link>
                    </Modal>
                </div>
            </div>
           
        </div>
        
        )
};

export default ForgotPassword;