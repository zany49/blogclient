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



 const Post =({
     
    post,
    handleDelete,
    handleLike,
    handleUnlike,
    handleComment,
    commentsCount =2,
    removeComment
})=>{
   
    const[state] = useContext(UserContext);
    const router = useRouter()


 // Postlist {posts.length} 
    return  (
        <>
            
            {post && post.postedBy && (<div key={post._id} className="card mb-5">
                <div className="card-header">
             
                    {/* <Avatar size={40} >
                        {post.postedBy.name[0]}
                    </Avatar>{" "} */}
                    <Avatar size={40} src={imageSource(post.postedBy)}/>
                     
                   <span className="pt-2 ml-3" style={{marginLeft:"1rem"}}>
                        {post.postedBy.name}</span>
                   <span className="pt-2 ml-3 text-muted" style={{marginLeft:"1rem"}} >
                        {moment(post.createdAt).fromNow()}</span>
                </div>
                <div className="card-body">
                {renderHTML(post.content)}
                </div>
                <div className="card-footer">
                    
                        {post.image && <PostImages url={post.image.url} />}
                    <div className="d-flex pt-2">

                    {state&& state.user && post.likes && post.likes.includes(state.user._id) ?
                     (<HeartFilled className="text-danger p-2 h5" onClick={()=>handleUnlike(post._id)} />)
                     :
                    (
                    <HeartOutlined className="text-danger p-2 h5" onClick={()=>handleLike(post._id)} />) 
                }

                    <div className="pt-2 pl-3">{post.likes.length} likes
                   
                    </div>
                    

                    <CommentOutlined 
                    onClick={()=>handleComment(post)}
                    className="text-danger p-2 h5 pl-5" />

                    <div className="pt-2 pl-3">
                      <Link href={`/posts/${post._id}`}>  
                       <a> {post.comments.length} comments </a> 
                        </Link>
                    </div>
  
  
  
  
  
                 {state && state.user && state.user._id === post.postedBy._id && (
         
                   <>
                        <EditOutlined onClick={()=>router.push(`/user/post/${post._id}`)} className="text-danger p-2 h5 pl-5 mx-auto" />
                        <DeleteOutlined onClick={()=>handleDelete(post)} className="text-danger p-2 h5 pl-5" />
                     </>
                 )}
                    </div>
                </div>
                {/* comments below */}
                {post.comments && post.comments.length > 0 && (
                    // style={{maxHeight:'125px',overflow:'scroll'}}
                    <ol className="list-group" >
                       {post.comments.slice(0,commentsCount).map((c)=>
                        <li key={c._id} className="list-group-item d-flex justify-content-between algin-items-start">
                        <div className="ms-2 me-auto">
                            <div>
                                <Avatar 
                                size={20}
                                className="mb-1 mr-3"
                                src={imageSource(c.postedBy)}
                                />   {c.postedBy.name}
                                 
                            </div>
                            <div>{c.text}</div>
                        </div>
                        <span className="badge rounded-pill text-muted">
                            {moment(c.created).fromNow()}
                            {state && state.user && state.user._id === c.postedBy._id &&(
                                <div className="ml-auto mt-1">
                                    <DeleteOutlined onClick={()=>removeComment(post._id,c)} className="h6 pl-2 text-danger"/>
                                </div>
                            )}
                            </span>
                            
                        </li>
                       )}
                    </ol>
                )}
                </div>)}
                
            </>
    );
}

export default Post;