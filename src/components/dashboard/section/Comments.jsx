import React, {useState, useRef} from 'react';

export default function Comments(props){
    const [showEdit, setShowEdit] = useState(false);
    const comment_textarea = useRef(null);
    const update_comment_button = useRef(null);
    const [disabled, setDisabled] = useState({update_comment_button:false});

    function displayEdit(){
        setShowEdit(true);
        update_comment_button.current.disabled=false;
        setDisabled({...disabled,update_comment_button:false});
        comment_textarea.current.value = props.comment_text;
    }
    function submitEdit(event){
        event.preventDefault();
        setShowEdit(false);
        props.onEditComment(event.target[0].value, props.comment_id,props.container_id);
    }
    function showDeleteCommentModal(event){
        event.preventDefault();
        props.onShowDeleteCommentModal(props.container_id, "comment", props.comment_id);
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
    return(
        <li className='comment_item' data-comment-id={props.comment_id}>
            <div className={`message_content ${showEdit ? "hide" : ""}`}>
                <p className='message_text'>{props.comment_text}</p>
                <div className='buttons'>
                    <button type='button' className='edit_button' onClick={displayEdit}><span className='edit_icon'></span>Edit</button>
                    <button type='button' className='delete_button' onClick={showDeleteCommentModal}><span className='delete_icon'></span>Delete</button>
                    <div className='username'><span className='user_icon'></span><span className='user_name'>You</span> - Few seconds ago</div>
                </div>
            </div>
            <form method="POST" action='/' className={`edit_comment ${showEdit ? "" : "hide"}`} onSubmit={submitEdit}>
                <textarea name='edit_comment_textarea' className='edit_comment_textarea' placeholder='Type your comment here.' ref={comment_textarea} onKeyUp={(event)=>{checkTextArea(event, update_comment_button, "update_comment_button")}}></textarea>
                <button type='button' className='cancel_update' onClick={()=>{setShowEdit(false)}}>Cancel</button>
                <button type='submit' ref={update_comment_button} className={`${disabled.update_comment_button ? "disabled": ""}`}>Update Comment</button>
            </form>
        </li>
    );
}