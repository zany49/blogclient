import {Avatar} from "antd";
export const imageSource = (user)=>{
    if(user.image){
        return user.image.url;
    }else{
        return "/images/userpic.jpg";
    }
}
