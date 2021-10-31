import { useContext,useState,useEffect } from "react";
import { UserContext } from "../../context";
import UseRoute from "../../components/routes/UserRoute"
import PostForm from "../../components/forms/PostForm"
import { useRouter,userRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList"

import People from "../../components/cards/people";
import Link from "next/link";
import {Modal, Pagination} from "antd";
import CommentForm from "../../components/forms/comments";
import Search from "../../components/search";

import io from 'socket.io-client';

const socket= io(process.env.NEXT_PUBLIC_SOCKETIO,{
    path: '/socket.io'
},{
    reconnection:true,
})


//use route is to route the user to login if isnt authorized
const Home =()=>{
    const [state,setState]= useContext(UserContext);
    //state
    const [content,setContent]=useState("");
    const [image,setImage]=useState({})
    const[uploading,setUploading]=useState(false)
    //post content
    const [post,setPosts]= useState([]);
    //people
    const[people,setPeople]= useState([]);
    //comments
    const [comment,setComments]= useState('');
    const[visible,setVisible]= useState(false);
    const[currentPost,setCurrentPost]= useState({})
    //pagenation
    const[totalpost,setTotalpost]= useState(0);
    const[page,setPage]=useState(1);
    //router
    const router = useRouter();

        useEffect(()=>{
          if(state && state.token)  {
                newsFeed();
                findPeople();
            }
        },[state && state.token,page])

        useEffect(()=>{
            axios.get('/total-post').then(({data})=>setTotalpost(data))
        },[])





            const newsFeed = async()=>{
                try{
                    const {data} = await axios.get(`/news-feed/${page}`);;
                    // console.log("user posts =>",data);
                    setPosts(data)
                }catch(err){
                    console.log(err)
                }
            }

            const  findPeople = async()=>{
                try{
                    const {data} = await axios.get('/find-users');
                    setPeople(data);
                }catch(err){
                    console.log(err);
                }
            }

 

//uploading picture
    const postSubmit = async(e)=>{
        e.preventDefault();
        // console.log("post =>", content);
        try{

           const {data}= await axios.post('/create-post',{content,image});
           console.log("create post res",data);
            if(data.error){
                toast.error(data.error);
            }else{
                setPage(1);
                newsFeed();
                toast.success("post created");
                setContent("");
                setImage({});

                socket.emit("new-post",data)
            }
            
        }catch(err){
            console.log(err);
        }
    }



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


const handleDelete = async(post)=>{
    try{
        const answer = window.confirm("Are you sure you want to delete?");
        //if answer is no
        if(!answer) return;
        const {data} = await axios.delete(`/delete-posts/${post._id}`);
        toast.error('post deleted')
        newsFeed();
    }catch(err){
        console.log(err);
    }
}

const handleFollow = async(user)=>{
    // console.log("users",user)
    try{
        const {data} = await axios.put('/user-follow',{_id:user._id});
        // console.log("follow user",data)
        
        //update local storage, update user , keep token
        let auth = JSON.parse(localStorage.getItem("auth"))
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth))
        //update context
        setState({...state, user: data});
        //update people state
        let filtered = people.filter((p)=> p._id !== user._id)
        setPeople(filtered);
        //rerender the post of following people
        newsFeed();
        toast.success(`Following ${user.name}`);
  
  
    }catch(err){
        console.log(err);
    }
}

const handleLike = async (_id)=>{
    // console.log("like from", _id);
    try{
        const {data} = await axios.put('/post-like',{_id})
        // console.log("like",data);
        newsFeed();
    }catch(err){
        console.log(err);
    }
}

const handleUnlike = async (_id)=>{
    // console.log("unlike from", _id);
    try{
        const {data} = await axios.put('/post-unlike',{_id})
        // console.log("unlike",data);
        newsFeed();
    }catch(err){
        console.log(err);
    }

}


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
            console.log(data)
            setComments('')
            setVisible(false);
            newsFeed();
        }catch(err){
            console.log(err)
        }
        // console.log("add comment to this post",currentPost._id);
        // console.log("save comment to db",comment); 

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
            console.log("comment remove",data)
            newsFeed();
        }catch(err){
            console.log(err);
        }
    }



    return(
        <UseRoute>
        <div className="container-fluid body">
            <div className="row py-5 text-light">
                <div className="col text-center">
                    <h1>News Feed</h1>
                </div>
            </div>
            <div className="row py-3">
                <div className="col-md-8">
                  <Search />
                    <br/>
                    <PostForm
                    content={content}
                    setContent={setContent}
                    postSubmit={postSubmit}
                    handleImage={handleImage}
                    uploading={uploading}
                    image={image}
                    
                    />
                    <br/>
                    <PostList 
                    posts={post}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                    handleComment={handleComment}
                    removeComment={removeComment}
                    page="post"
                    />
                    {/* {totalpost} */}
                    <Pagination 
                    current={page} 
                    total={(totalpost/3)*10} 
                    onChange={(value)=>setPage(value)} 
                    className='pb-5'
                    />
                    </div>

                    {/* <pre>{JSON.stringify(post,null , 4)}</pre> */}
                    <div className="col-md-4">
                    {/* <pre>{JSON.stringify(people,null , 4)}</pre> */}
                    
                    {state && state.user && state.user.following && (
                        <Link href={`/user/following`}>
                        <a className="h6">following ({state.user.following.length})</a>
                        </Link>
                    )}
                    <br/>
                    <br/>
                    
                    <h6>People you may know</h6>
                    <People people={people} handleFollow={handleFollow} />
                        </div>
                
                </div>
                <Modal 
                visible={visible} 
                onCancel={()=>setVisible(false)}
                title="comment"
                footer={null}
                >
                    <CommentForm addComment={addComment} setComments={setComments} comment={comment} />
                    
                    </Modal>

                

        </div>
        </UseRoute>
    )
}

export default Home;