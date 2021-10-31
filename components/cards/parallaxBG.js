import { Children } from "react";


const ParallaxBg =({url,children="MERN Camp"})=>{
  
    return(

        <div className="container-fluid"
         // paralox effect for fixed background
        style={{
            backgroundImage:"url("+ url +")",
            backgroundColor:"grey",
            backgroundAttachment:"fixed",
            padding:"100px 0px 75px 0px",
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover",
            backgroundPosition:"center center",
            display:"block",
            
        }}
        
        >
                <h1 className="display-4 text-center py-2" style={{color:"white"}}>{children}</h1>
               
        </div>
    )
}

export default ParallaxBg;