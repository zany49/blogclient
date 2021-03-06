import {useContext,useState,useEffect}from'react';
import { Avatar,List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from '@ant-design/icons';
import Link from "next/link";
import { toast } from "react-toastify";
import {imageSource} from "../../functions"




const Following = ()=>{
    const [state,setState] = useContext(UserContext);
   const [people,setPeople]= useState([]);
    const router = useRouter();

useEffect(()=>{
    if (state && state.token) fetchFollowing();
},[state && state.token]);

    const fetchFollowing = async ()=>{
        try{
            const {data} = await axios.get("/user-following");
            // console.log(data);
            setPeople(data);
        }catch(err){
            console.log(err);
        }
    };
    const imageSource = (user)=>{
        if(user.image){
            return user.image.url;
        }else{
            return "/images/userpic.jpg";
        }
    }

const handleUnfollow = async (user)=>{
    try{
        const {data} = await axios.put('/user-unfollow',{_id:user._id});
        // console.log(data);
        let auth = JSON.parse(localStorage.getItem("auth"))
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth))
        //update context
        setState({...state, user: data});
        //update people state
        let filtered = people.filter((p)=> p._id !== user._id)
        setPeople(filtered);
       
        toast.error(`Unfollowed ${user.name}`);
    }catch(err){
        console.log(err);
    }
}


    return (
        <div className="container-fluid body" style={{height:"100vh"}} >
            <div className="row col-md-6 offset-md-3">
            {/* <pre>{JSON.stringify(people,null,4)}</pre> */}
            <List
            
                itemLayout="horizontal"
                dataSource={people}
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src={imageSource(user)}/>}
                        title={
                            <div className="d-flex justify-content-between">
                                {user.username}
                                <span className="text-primary">
                               <a onClick={()=>handleUnfollow(user)}>Unfollow</a> </span>
                            </div>
                        }
                        
                        />
                    </List.Item>
    )}       
            />
                <Link href="/user/dashboard">
                    <a className="d-flex justify-content-center pt-5 h3">
                        <RollbackOutlined />
                    </a>
                </Link>
            
            </div>
            </div>
    )
} 

export default Following;






