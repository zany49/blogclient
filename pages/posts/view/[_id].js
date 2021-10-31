import {useContext} from 'react';
import {UserContext} from '../../../context';
import ParallaxBg from '../../../components/cards/parallaxBG';
import axios from "axios";
import Head from 'next/head';
import PostPublic from '../../../components/cards/postpublic'




const SinglePost =({post})=>{
    const [state,setState]= useContext(UserContext);

    const head = () => (

        <Head>
        <title>BlogBucket - a Blogger community  | BlogBucket</title>
        <meta name="description" content="BlogBucket - a Blogger community  | BlogBucket"/>
        <meta property="og:description" content="BlogBucket - a Blogger community  | BlogBucket"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="BlogBucket"/>
        <meta property="og:url"
        content={`http://BlogBucket.com/posts/view/${post._id}`}
        />
        <meta property="og:image:secure_url" 
        content={imageSource(post)}
        />
         </Head>
    )
 const imageSource = (post)=>{
        if(post.image){
            return post.image.url;
        }else{
            return "/images/default.jpg";
        }
    }
    

    return(
        <>
        {head()}
        <ParallaxBg url="">Blog Bucket</ParallaxBg>
        {/* <pre>{JSON.stringify(posts,null,4)}</pre> */}
        <div className="container-fluid body">
            <div className="row pt-5">
            
                <div className="col-md-8 offset-md-2">
               
                        {/* <a><Post key={post._id} post={post} /></a> */}
                        <PostPublic key={post._id} post={post} />
                
                </div>
            
        
      
            </div>
        </div>
        
        </>
    )
}
export async function getServerSideProps(context) {
    const {data} = await axios.get(`/posts/${context.params._id}`)
    // console.log(data)
    return {
      props: {
          post: data
      }, // will be passed to the page component as props or use posts as {posts} in home function
    }
  }
export default SinglePost;