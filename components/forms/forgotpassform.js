import { SyncOutlined } from "@ant-design/icons";



//page is imported from login.js 
const ForgotPasswordForm =({
    handleSubmit,email,setEmail,newpassword,setNewPassword,loading,
    page
})=>(
    <form onSubmit={handleSubmit}>
        

                      <div className="form-group py-3">
                          <small><label className="text-muted">Email</label></small>
                          <input type="text" className="form-control" placeholder="email"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                           />

                      </div>
                      <div className="form-group py-3">
                          <small><label className="text-muted">New Password</label></small>
                          <input type="password" className="form-control" placeholder="password"
                          value={newpassword}
                          onChange={(e)=>setNewPassword(e.target.value)}
                          />

                      </div>
                       
                      <div className="form-group  py-3">
                      <button
                       disabled={   !email || !newpassword  || loading} 
                      type="submit" 
                      className=" btn btn-primary col-md-12">
                          {loading? <SyncOutlined spin className="py-1" /> :"Submit"}
                          </button>
                      </div>
                     
                  </form>
);

export default ForgotPasswordForm;