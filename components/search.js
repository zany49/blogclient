import axios from "axios";
import { useEffect,useState,useContext } from "react";
import { UserContext } from "../context";
import People from "../components/cards/people";
import { toast } from "react-toastify";



const Search =()=> {
    const [state,setState] = useContext(UserContext);

    const[query,setQuery]=useState("");
    const[result,setResult]=useState([]);

    const searchUser=async (e)=>{
        e.preventDefault();
        // console.log(`from "${query}" fromdb`);
        try{
            const {data} = await axios.get(`/search-user/${query}`);
            // console.log("search user=>",data); 
            setResult(data);
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
            let filtered = result.filter((p)=> p._id !== user._id)
            setResult(filtered);
            //rerender the post of following people
            
            toast.success(`Following ${user.name}`);
      
      
        }catch(err){
            console.log(err);
        }
    }

   const handleUnfollow = async (user)=>{
    try{
        const {data} = await axios.put('/user-unfollow',{_id:user._id});
        // console.log(data);
        let auth = JSON.parse(localStorage.getItem("auth"))
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth))
        //update context
        setState({...state, user: data});
        //update people state
        let filtered = result.filter((p)=> p._id !== user._id)
        setResult(filtered);
       
        toast.error(`Unfollowed ${user.name}`);
    }catch(err){
        console.log(err);
    }
}
    return (
        <>
        <form className="form-inline  row" onSubmit={searchUser}>
            <div className="col-10">
            <input 
            type="search" 
            onChange={(e)=>{setQuery(e.target.value)
            setResult([]);
            }} 
            value={query}
            className="form-control " 
            placeholder="Search User"
            />
            </div>
            <div className="col-2">
            <button className="btn btn-outline-primary " type="submit">Search</button> 
            </div>
            
        </form>
        {result && result.map((r)=><People key={r._id} people={result} handleFollow={handleFollow} handleUnfollow={handleUnfollow}/>)}
        </>
    )
}

export default Search;