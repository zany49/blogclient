import {useContext}from'react';
import { Avatar,List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import { imageSource } from '../../functions';
import Link from "next/link";




const People = ({people, handleFollow,handleUnfollow})=>{
    const [state] = useContext(UserContext);
    const router = useRouter();

    // const imageSource = (user)=>{
    //     if(user.image){
    //         return user.image.url;
    //     }else{
    //         return "/images/default.jpg";
    //     }
    // }

    return (
        
            <>
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
                                <Link href={`/user/${user.username}`}>
                                <a> {user.username}  </a> 
                                </Link>
                                
                                {/* to check  wat we get in user for search */}
                                {/* {JSON.stringify(user)} */}
                                {state && state.user && user.followers && user.followers.includes(state.user._id)
                                 ? 
                                (<span className="text-primary">
                                <a onClick={()=>handleUnfollow(user)}>Unfollow</a> 
                                </span>
                                ) 
                                : 
                                (<span className="text-primary">
                               <a onClick={()=>handleFollow(user)}>Follow</a> 
                               </span>
                               )}
                               
                               
                            </div>
                        }
                        
                        />
                    </List.Item>
    )}
        
            />

            
            </>
        
    )
} 

export default People;






