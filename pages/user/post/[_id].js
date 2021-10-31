import {useEffect,useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import UseRoute from "../../../components/routes/UserRoute"
import PostForm from "../../../components/forms/PostForm"
import { toast } from 'react-toastify';
const EditPost=()=>{

    const [post,setPost]= useState({});
 //state
    const [content,setContent]=useState("");
    const [image,setImage]=useState({})
    const[uploading,setUploading]=useState(false)

    const router = useRouter();
    // console.log("router",router)
    const _id = router.query._id;

    useEffect(()=>{
        if(_id) fetchPost();
    },[_id]);

    const fetchPost =async()=>{

        try{
            const {data} = await axios.get(`/user-posts/${_id}`);
            // console.log(data);
            setPost(data);
            setContent(data.content);
            setImage(data.image);
        }catch(err){
            console.log(err);
        }
    }

    const postSubmit = async (e) => {
        e.preventDefault();
        // console.log("submitpost",content,image)
        try{
            const {data} = await axios.put(`/update-posts/${_id}`,{content,image});
            if(data.error){
                toast.error(data.error)
            }else{
                toast.success("post updated");
                router.push("/user/dashboard")
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

 {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
     return(
        <UseRoute>
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>News Feed</h1>
                </div>
            </div>
            <div className="row py-3">
                <div className="col-md-8 offset-md-2"> 
                    <PostForm
                    content={content}
                    setContent={setContent}
                    postSubmit={postSubmit}
                    handleImage={handleImage}
                    uploading={uploading}
                    image={image}
                    />
                    
                    </div>
                </div>

        </div>
        </UseRoute>
    )
}

export default EditPost;