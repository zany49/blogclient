import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useRoute from "../../components/routes/UserRoute"
import Post from "../../components/cards/post"
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import {Modal} from "antd";
import CommentForm from "../../components/forms/comments";

const PostComments = ()=>{

    const[post,setPost]=useState({});
    const router = useRouter();
    const _id = router.query._id;
    //comments
    const [comment,setComments]= useState('');
    const[visible,setVisible]= useState(false);
    const[currentPost,setCurrentPost]= useState({})


    useEffect(()=>{
        if(_id) fetchPost();
    },[_id]);

    const fetchPost= async ()=>{
        try{
            const {data} = await axios.get(`/user-posts/${_id}`);
            console.log(data)
            setPost(data)
        }catch(err){
            console.log(err);
        }
    }

    const removeComment = async (postId, comment) =>{
        // console.log(postId, comment)
        let answer = window.confirm("Are you sure?")
        if(!answer) return;
        try{
            const {data} = await axios.put("/remove-comment",{
                postId,
                comment,
            })
            // console.log("comment remove",data)
            fetchPost();
        }catch(err){
            console.log(err);
        }
    }
    //likes
    const handleLike = async (_id)=>{
        // console.log("like from", _id);
        try{
            const {data} = await axios.put('/post-like',{_id})
            // console.log("like",data);
            fetchPost();
        }catch(err){
            console.log(err);
        }
    }
    
    const handleUnlike = async (_id)=>{
        // console.log("unlike from", _id);
        try{
            const {data} = await axios.put('/post-unlike',{_id})
            // console.log("unlike",data);
            fetchPost();
        }catch(err){
            console.log(err);
        }
    
    }







    //comments
    const  handleComment =(post)=>{
        setCurrentPost(post);
        setVisible(true);

    }

    const addComment = async (e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.put('/add-comment',{
                postId: currentPost, comment
            })
            // console.log(data)
            setComments('')
            setVisible(false);
            fetchPost();
        }catch(err){
            console.log(err)
        }
        // console.log("add comment to this post",currentPost._id);
        // console.log("save comment to db",comment); 

    }

    return (
        <div className="container-fluid body">
            <div className="row py-5 text-light">
                <div className="col text-center">
                    <h1>View Post</h1>
                </div>
            </div>
            
    
    <div className="container col-md-8 offset-md-2 mt-5">
        <Post 
        post={post} 
        handleComment={handleComment} 
       handleLike={handleLike}
       handleUnlike={handleUnlike}
        removeComment={removeComment} 
        commentsCount={100} 
        />
    </div>
    <Link href='/user/dashboard'>
    <a className="d-flex justify-content-center h3 pb-5" >
        <RollbackOutlined />
        </a>
    </Link>
             <Modal 
                visible={visible} 
                onCancel={()=>setVisible(false)}
                title="comment"
                footer={null}
                >
                    <CommentForm addComment={addComment} setComments={setComments} comment={comment} />
                    
                    </Modal>
    </div>
    )
};

export default PostComments;