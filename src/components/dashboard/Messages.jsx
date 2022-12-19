import React, {useState, useRef} from 'react';
import Comments from "./Comments";

export default function Messages(props){
    const update_message_button = useRef(null);
    const post_comment_button = useRef(null);
    const edit_message_textarea = useRef(null);
    const post_message_textarea = useRef(null);

    const [showEdit, setShowEdit] = useState(false);
    const [showPostComment, setShowPostComment] = useState(false);
    const [disabled, setDisabled] = useState({post_comment_button:true, update_button:false});
    let comment_item = [];
    let comment_counter = Object.keys(props.comments).length;

    function commentSubmit(event){
        event.preventDefault();
        props.onCreateComment(event,props.message_id);
        post_message_textarea.current.value="";
        post_comment_button.current.disabled=true;
        setDisabled({...disabled,post_comment_button:true});
    }
    function displayPostComment(){
        if(showPostComment){
            setShowPostComment(false);
            
        }
        else{
            setShowPostComment(true);
        }
    }
    function displayEdit(){
        update_message_button.current.disabled=false;
        setDisabled({...disabled,update_button:false});
        if(showEdit){
            setShowEdit(false);
        }
        else{
            setShowEdit(true);
            edit_message_textarea.current.value=props.message;
        }
    }
    
    function submitEdit(event){
        event.preventDefault();
        const new_message = event.target[0].value;
        props.onEditMessage(new_message,props.message_id);
        displayEdit();
    }
    function checkTextArea (event, submit_button, class_name){
        if(event.target.value.length>0){
            submit_button.current.disabled=false;
            setDisabled({...disabled, [class_name]:false});
        }
        else{
            submit_button.current.disabled=true;
            setDisabled({...disabled, [class_name]:true});
        }
    }
    function displayDeleteModal(){
        props.onShowDeleteModal(props.message_id, "message");
    }
    for(const item in props.comments){
        comment_item.push(<Comments key={item} comment_text={props.comments[item]} comment_id={item} onEditComment={props.onEditComment} onShowDeleteCommentModal={props.onShowDeleteModal} container_id={props.message_id}/>)        
    }
    return (
        <li className='message_item' data-message-id={props.message_id}>
            <div className={`message_content ${showEdit ? "hide" : ""}`}>
                <p className='message_text'>{props.message}</p>
                <div className='buttons'>
                    <button type='button' className={`comment_button ${comment_counter ? "active" : ""}`} onClick={displayPostComment}><span className='comment_icon'></span><span className='comment_count'>{comment_counter}</span> comment</button>
                    <button type='button' className='edit_button' onClick={displayEdit}><span className='edit_icon'></span>Edit</button>
                    <button type='button' className='delete_button' onClick={displayDeleteModal}><span className='delete_icon'></span>Delete</button>
                    <div className='username'><span className='user_icon'></span><span className='user_name'>You</span> - Few seconds ago</div>
                </div>
            </div>
            <form className={`edit_message_form ${showEdit ? "" : "hide"}`} method="POST" action="/" onSubmit={submitEdit}>
                    <textarea name='edit_message_textarea' className='edit_message_textarea' placeholder='Type your comment here.' defaultValue={props.message} onKeyUp={(event)=>{checkTextArea(event, update_message_button, "update_button")}} ref={edit_message_textarea}></textarea>
                    <button type='button' className='cancel_update' onClick={displayEdit}>Cancel</button>
                    <button type='submit' ref={update_message_button} className={`${disabled.update_button ? "disabled": ""}`}>Update Message</button>
            </form>
            <form className={`post_comment_form ${showPostComment ? "" : "hide"}`} method="POST" action='/' onSubmit={commentSubmit}>
                <textarea name='post_comment_textarea' className='post_comment_textarea' placeholder='Type your comment here.' onKeyUp={(event)=>{checkTextArea(event, post_comment_button, "post_comment_button")}} ref={post_message_textarea}></textarea>
                <button type='submit' ref={post_comment_button} className={`${disabled.post_comment_button ? "disabled":""}`}>Post Comment</button>
            </form>
            <ul className={`comment_container ${showPostComment ? "": "hide"}`}>
                {comment_item.splice(0).reverse()}
            </ul>
        </li>
    );
}