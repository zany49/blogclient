import { SyncOutlined } from "@ant-design/icons";



//page is imported from login.js 
const AuthForm =({
    handleSubmit,name,setName,email,setEmail,password,setPassword,secret,setSecret,loading,
    page,username,setUsername,about,setAbout,profileUpdate
})=>(
    <form onSubmit={handleSubmit}>
        
        {profileUpdate && (<div className="form-group py-3">
                          <small>
                              <label className="text-muted">UsernName</label>
                              </small>
                          <input type="text" className="form-control" placeholder="UserName"
                          value={username}
                          onChange={(e)=>setUsername(e.target.value)}
                           
                           />

                      </div>)}
                     {profileUpdate && ( <div className="form-group py-3">
                          <small>
                              <label className="text-muted">About</label>
                              </small>
                          <input type="text" className="form-control" placeholder="About"
                          value={about}
                          onChange={(e)=>setAbout(e.target.value)}
                           
                           />

                      </div>)}

                      {page !== "login" && 
                      <div className="form-group py-3">
                          <small>
                              <label className="text-muted">Name</label>
                              </small>
                          <input type="text" className="form-control" placeholder="Your name"
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                           
                           />

                      </div>}
                      <div className="form-group py-3">
                          <small><label className="text-muted">Email</label></small>
                          <input type="text" className="form-control" placeholder="email"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                           disabled={profileUpdate}
                           />

                      </div>
                      <div className="form-group py-3">
                          <small><label className="text-muted">Password</label></small>
                          <input type="password" className="form-control" placeholder="password"
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}
                          />

                      </div>
                      {page !== "login"&& <>
                      <div className="form-group py-3">
                          <small>
                              <label className="text-muted">
                                  pick a question
                              </label>
                              </small>
                              <select className="form-control" >
                                  <option value>What is your Favorite colour?</option>
                                  <option value>What is your best friends name?</option>
                                  <option value>What is your Favorite food?</option>
                              </select>
                         <small className="form-text text-muted ">
                             you can use this to rest your password if forgotten.
                         </small>
                         </div>
                         <div className="form-group  py-3">
                             <input type="text" className="form-control" placeholder="write your answer" 
                             value={secret}
                             onChange={(e)=>setSecret(e.target.value)}
                             />
                             </div>
                       
                      </>}
                      <div className="form-group  py-3">
                      <button
                       disabled={ profileUpdate ? loading :
                         page === "login" ?  !email||!password 
                       : !email || !password || !secret || loading} 
                      type="submit" 
                      className=" btn btn-primary col-md-12">
                          {loading? <SyncOutlined spin className="py-1" /> :"Submit"}
                          </button>
                      </div>
                  </form>
);

export default AuthForm;