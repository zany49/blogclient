const CommentForm = ({addComment,comment,setComments})=>{
    return(
        <form onSubmit={addComment}>
        <input 
        type="text"
        className="form-control"
        placeholder="write something.."
        value={comment}
        onChange={(e)=> setComments(e.target.value)} 
        />
        <button className="btn btn-primary btn-sm btn-block mt-3">
            submit
        </button>
    </form>
    )
}

export default CommentForm;