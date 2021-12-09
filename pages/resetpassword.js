import { useState, useContext } from "react";
import axios from 'axios';
import {Modal} from 'antd';
import {toast} from "react-toastify";
import Link from 'next/link';
import { UserContext } from "../context";
import {useRouter} from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import {Card} from 'antd';



const RestPassword = () => {
   
    
    const [email,setEmail] = useState("");
    const [ok, setOk] = useState(false);
    const[loading,setLoading] = useState(false);
    
    const [state] = useContext(UserContext);



    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // console.log(name, email, password, secret);
          setLoading(true);
          const { data } = await axios.post(`/password-rest`, {
            email,
          });
      
          // console.log("forgot password res => ", data);
      
          if (data.error) {
            toast.error(data.error);
            setLoading(false);
          }
      
          if (data.success) {
            setEmail("");
            toast.success(data.success);
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
         <form onSubmit={handleSubmit}>
         <Card hoverable>
         <div className="row">
                        <div className="">
                            <h4 className="d-flex justify-content-center">RESET-PASSWORD</h4>
                            <hr />
                        </div>

                    </div>
                <div className="form-group py-3">
                          <small><label className="text-muted">Email</label></small>
                          <input type="text" className="form-control" placeholder="email"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                           />

                      </div>
                      <div className="form-group  py-3">
                      <button
                       disabled={   !email ||  loading} 
                      type="submit" 
                      className=" btn btn-outline-success col-12">
                          {loading? <SyncOutlined spin className="py-1" /> :"Submit"}
                          </button>
                      </div>
                      </Card>
                      </form>
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
                    <p>Password rest link has been sent Your mail! please check your email</p>
                   
                    </Modal>
                </div>
            </div>
           
        </div>
        
        )
};

export default RestPassword;