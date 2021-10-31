import { Avatar } from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(()=>import("react-quill"),{ssr:false} );
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CameraOutlined,LoadingOutlined } from "@ant-design/icons";





const PostForm=({content, setContent,postSubmit,handleImage,uploading,image}) => {
    return(
        <div className="card">
            <div className="card-body pb-3 ">
                {/* onsubmit on form works on both time while clicking the submit button 
                as well as on clicking enter and works on only input field not in textarea  */}
                <form className="form-group" onSubmit={postSubmit} >
                    <ReactQuill
                    theme="snow"
                    value={content}
                    // while using reactquill event.target.value is not required
                    onChange={(e) =>setContent(e)}
                    className="form-control"
                    placeholder="write some thing"
                    />
                    
                </form>
                    
            </div>
            <div className="card-footer d-flex justify-content-between text-muted">
            <button className="btn btn-primary btn-sm mt-1"
            onClick={postSubmit}
            disabled={!content}
            >Post</button>

                <label className="">
                    {
                        image && image.url ? (
                            <Avatar size={30} src={image.url} className="mt-1"/>
                        ) : uploading ? (<LoadingOutlined className="mt-2"/>) : (<CameraOutlined className="mt-2"/>)
                    }
                    
                    <input onChange={handleImage} type="file" accept="images/*" hidden />
               </label>

                </div>

        </div>
    ) 
}

export default PostForm;

