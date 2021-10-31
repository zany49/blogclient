import { useState, useContext,useEffect } from "react";
import axios from 'axios';
import {Modal,Avatar} from 'antd';
import {toast} from "react-toastify";
import Link from 'next/link';
import { UserContext } from "../../../context";
import {useRouter} from "next/router";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";

import AuthForm from "../../../components/forms/authform";


const ProfileUpdate = () => {
   
    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [about,setAbout] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [secret,setSecret] = useState("");
    const [ok, setOk] = useState(false);
    const[loading,setLoading] = useState(false);
    //profile pic
    const[image,setImage]=useState({});
    const[uploading,setUploading] = useState(false);


    const [state,setState] = useContext(UserContext);
    const router = useRouter();
 
    useEffect(()=>{
        if(state && state.user){
            // console.log('user from state=>', state.user);
        setUsername(state.user.username);
        setAbout(state.user.about);
        setName(state.user.name);
        setEmail(state.user.email);
        setImage(state.user.image);
        }
    },[state && state.user])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
        // console.log(name,email,password,secret);
        setLoading(true);
       const {data} = await axios.put(`/update-profile`,{
            username,
            about,   
            name,
            email,
            password,
            secret,
            image,
        });
            // console.log('updated data=>',data)
        if(data.error){
            toast.error(data.error);
            setLoading(false);
        }else{

            //we use this for making empty the form
            // setName('');
            // setPassword('');
            // setEmail('');
            // setSecret('');
                //update localStorage, update user, keep token 
            let auth = JSON.parse(localStorage.getItem('auth'));
            auth.user = data;
            localStorage.setItem("auth",JSON.stringify(auth));
            //updtain context 
            setState({...state, user: data})

            setLoading(false);
            setOk(true);
        }



      
        }
        catch(error){
            toast.error(error.response.data);
            setLoading(false);
        }
    };

    //if person is loggedin and try to /login manually then redirect to the home page
    // if(state && state.token) router.push('/');

    const handleImage= async (e)=>{
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('image',file);
        // console.log([...formData]);
        setUploading(true);
        try{
            const {data} = await axios.post("/upload-image", formData);
            // console.log("uploaded image",data);
            setImage({
                url: data.url,
                public_id: data.public_id,
            });
            setUploading(false);
        }catch(err){
            console.log(err);
            setUploading(false);
        }
    };


    return(
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>ProfileUpdate</h1>
                </div>
            </div>
            
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">


                <label className="d-flex justify-content-center h4">
                    {
                        image && image.url ? (
                            <Avatar size={90} src={image.url} className="mt-1"/>
                        ) : uploading ? (<LoadingOutlined className="mt-2"/>) : (<CameraOutlined className="mt-2"/>)
                    }
                    
                    <input onChange={handleImage} type="file" accept="images/*" hidden />
               </label>

                  <AuthForm 
                  profileUpdate={true}
                  username={username}
                  setUsername={setUsername}
                  about={about}
                  setAbout={setAbout}
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
                    <p>Your Profile has been updated sucessfully </p>
                    
                    </Modal>
                </div>
            </div>
           

         

        </div>
        
        )
};

export default ProfileUpdate;