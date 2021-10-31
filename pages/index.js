import {useContext,useEffect, useState} from 'react';
import {UserContext} from '../context';
import ParallaxBg from '../components/cards/parallaxBG';
import axios from "axios";
import Post from '../components/cards/post'
import Head from 'next/head';
import Link from "next/link";
import PostPublic from '../components/cards/postpublic'
import io from 'socket.io-client';

const socket= io(process.env.NEXT_PUBLIC_SOCKETIO,{
    path: '/socket.io'
},{
    reconnection:true,
})


const Home =({posts})=>{
    const [state,setState]= useContext(UserContext);
    const[newsFeed,setNewsfeed]=useState([]);
    // useEffect(()=>{
    //     // console.log("socket io join",socket);
    //     socket.on("receive-message",(newMessage)=>{
    //         alert(newMessage);
    //     })
    // },[])

    useEffect(()=>{
        socket.on("new-post",(newPost)=>{
            setNewsfeed([newPost,...posts])
        })
    })

    const head = () => (

        <Head>
        <title>BlogBucket - a Blogger community  | BlogBucket</title>
        <meta name="description" content="A BlogeBucket web-app developed as a project "/>
        <meta property="og:description" content="A BlogeBucket web-app developed as a project"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="BlogBucket"/>
        <meta property="og:url"
        content="http://BlogBucket.com"
        />
        <meta property="og:image:secure_url" 
        content="http://BlogBucket.com/images/default.jpg"
        />
         </Head>
    )

        const collection = newsFeed.length > 0 ? newsFeed : posts; 

    return(
        <>
        {head()}
        <ParallaxBg url="">Blog Bucket</ParallaxBg>
        {/* <pre>{JSON.stringify(posts,null,4)}</pre> */}
        
        {/* <button
            onClick={()=>{
                socket.emit("send-message","This is abdul!!!")
            }}
            >send message
            </button> */}
        <div className="container">
            
            <div className="row pt-5">
            {collection.map((post)=>(
                <div key={post._id} className="col-md-4">
                    <Link href={`/posts/view/${post._id}`}>
                        {/* <a><Post key={post._id} post={post} /></a> */}
                        <a><PostPublic key={post._id} post={post} /></a>
                    </Link>
                </div>
            
        
        ))}
            </div>
        </div>
        
        </>
    )
}
export async function getServerSideProps(context) {
    const {data} = await axios.get('/posts')
    // console.log(data)
    return {
      props: {
          posts: data
      }, // will be passed to the page component as props or use posts as {posts} in home function
    }
  }
export default Home;