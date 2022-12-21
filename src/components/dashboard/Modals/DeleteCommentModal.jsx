import React, {useRef} from "react";

export default function DeleteCommentModal(props){
    const message_id_value = useRef(null);
    const comment_id_value = useRef(null);

    function handleSubmit(event) {
        event.preventDefault();
        props.close();
        const comment_id = comment_id_value.current.value;
        const message_id = message_id_value.current.value;
        props.onSubmitCommentDelete(comment_id, message_id);
    }

    return(
        <div className="delete_modal">
            <form className="modal_board" onSubmit={handleSubmit}>
                <input type="hidden" name="comment_id" value={props.comment_id} ref={comment_id_value}/>
                <input type="hidden" name="message_id" value={props.message_id} ref={message_id_value}/>
                <button type="button" className="close_modal_button" onClick={()=>{props.close()}}><span></span></button>
                <h2>Confirm Delete Comment</h2>
                <p>Are you sure you want to remove this comment ?</p>
                <p>This action cannot be undone.</p>
                <div className="modal_buttons">
                    <button type="button" onClick={()=>{props.close()}}>Cancel</button>
                    <button type="submit">Yes, Remove it.</button>
                </div>
            </form>
        </div>
    );
}