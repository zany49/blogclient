import { useContext,useState,useEffect } from "react";
import { UserContext } from "../../context";
import AdminRoute from "../../components/routes/adminRoute";
import { useRouter,userRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import renderHTML from "react-render-html";


//use route is to route the user to login if isnt authorized
const Admin =()=>{
    const [state,setState]= useContext(UserContext);
   
    //post content
    const [post,setPosts]= useState([]);
    
    //router
    const router = useRouter();

        useEffect(()=>{
          if(state && state.token)  {
                newsFeed();
            
            }
        },[state && state.token])

      
            const newsFeed = async()=>{
                try{
                    const {data} = await axios.get(`/posts`);;
                    // console.log("user posts =>",data);
                    setPosts(data)
                }catch(err){
                    console.log(err)
                }
            }

           
const handleDelete = async(post)=>{
    try{
        const answer = window.confirm("Are you sure you want to delete?");
        //if answer is no
        if(!answer) return;
        const {data} = await axios.delete(`/admin/delete-posts/${post._id}`);
        toast.error('post deleted')
        newsFeed();
    }catch(err){
        console.log(err);
    }
}

    return(
        <AdminRoute>
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>Admin access</h1>
                </div>
            </div>
            <div className="row py-5">
                <div className="col-md-8 offset-md-2">
                    {post.map((post) =>(
                        <div key={post._id}  className="d-flex justify-content-between">
                            <div>
                            {renderHTML(post.content)}
                            {/* <b>{post.postedBy.name}</b> */}
                            </div>
                            <div 
                            onClick={() =>handleDelete(post)}
                            className="text-danger">
                                Delete
                             </div>
                        </div>
                        
                    ) )}
                </div>

            </div>
        </div>
        </AdminRoute>
    )
}

export default Admin;