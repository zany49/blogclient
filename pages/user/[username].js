import {useContext,useState,useEffect}from'react';
import { Avatar,List,Card } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from '@ant-design/icons';
import Link from "next/link";
import { toast } from "react-toastify";
import {imageSource} from "../../functions"


const{Meta} = Card ;//(or use)<Card.Meta></Card.Meta>

const Username = ()=>{
    const [state,setState] = useContext(UserContext);
   const [user,setUser]= useState({});
    const router = useRouter();

useEffect(()=>{
    if (router.query.username) fetchUser();
},[router.query.username]);

    const fetchUser = async ()=>{
        try{
            const {data} = await axios.get(`/user/${router.query.username}`);
            // console.log("route query username",data);
            setUser(data);
        }catch(err){
            console.log(err);
        }
    };
    const imageSource = (user)=>{
        // console.log("user name",user.username)
        if(user.image){
            return user.image.url;
        }else{
            return "/images/userpic.jpg";
        }
    }

// const handleUnfollow = async (user)=>{
//     try{
//         const {data} = await axios.put('/user-unfollow',{_id:user._id});
//         // console.log(data);
//         let auth = JSON.parse(localStorage.getItem("auth"))
//         auth.user = data;
//         localStorage.setItem("auth", JSON.stringify(auth))
//         //update context
//         setState({...state, user: data});
//         //update people state
//         let filtered = people.filter((p)=> p._id !== user._id)
//         setPeople(filtered);
       
//         toast.error(`Unfollowed ${user.name}`);
//     }catch(err){
//         console.log(err);
//     }
// }


    return (
        
            <div className="row col-md-6 offset-md-3">
            {/* <pre>{JSON.stringify(user,null,4)}</pre> */}
            <div className="pt-5 pb-5">
            <Card hoverable cover={<img src={imageSource(user)} alt={user.name} />}>
                <Meta title={user.name} description={user.about}/>
                <p className="pt-2 text-muted">
                    Joined:{moment(user.CreatedAt).fromNow()}
                </p>
                <div className="d-flex justify-content-between">
                    <Link href={`/user/following`}>
                    <span className="btn- btn-sm">
                    {user.followers && user.followers.length} Followers
                    </span>
                    </Link>

                    <span className="btn- btn-sm">
                    {user.following && user.following.length} Following
                    </span>
                </div>
            </Card>
                <Link href="/user/dashboard">
                    <a className="d-flex justify-content-center pt-5 h3">
                        <RollbackOutlined />
                    </a>
                </Link>
            
                </div>
            </div>
        
    )
} 

export default Username;






