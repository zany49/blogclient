import renderHTML from "react-render-html";
import moment from "moment";
import {Avatar} from "antd";
import PostImages from "../images/PostImages"
import { HeartOutlined,HeartFilled,CommentOutlined,EditOutlined,DeleteOutlined, } from '@ant-design/icons';
import {UserContext} from "../../context/index";
import {useContext} from "react";
import  {useRouter} from 'next/router';
import {imageSource} from "../../functions"
import Link from "next/link";
import Post from "../../components/cards/post"


 const PostList =({posts,handleDelete,handleLike,handleUnlike,handleComment,removeComment})=>{
   
    const[state] = useContext(UserContext);
    const router = useRouter()


 // Postlist {posts.length} 
    return  (
        <>
            {posts  && posts.map((post)=>
            <Post
            key={post._id}
            post={post} 
            handleComment={handleComment} 
            handleLike={handleLike}
             handleDelete={handleDelete} 
            handleUnlike={handleUnlike}
            removeComment={removeComment}
            />
            )} 
            </>
    );
}

export default PostList;