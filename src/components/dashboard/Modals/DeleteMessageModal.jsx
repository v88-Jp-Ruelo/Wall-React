import React, {useRef} from "react";

export default function DeleteMessageModal(props){
    const message_id_value = useRef(null);
    
    function submitDelete(event){
        event.preventDefault();
        const message_id = message_id_value.current.value;
        props.onSubmitMessageDelete(message_id);
        props.close();
    }

    return(
        <div className="delete_modal">
            <form className="modal_board" onSubmit={submitDelete}>
                <input type="hidden" name="message_id" value={props.message_id} ref={message_id_value}/>
                <button type="button" className="close_modal_button" onClick={()=>{props.close()}}><span></span></button>
                <h2>Confirm Delete Message</h2>
                <p>Are you sure you want to remove this message ?</p>
                <p>This action cannot be undone.</p>
                <div className="modal_buttons">
                    <button type="button" onClick={()=>{props.close()}}>Cancel</button>
                    <button type="submit">Yes, Remove it.</button>
                </div>
            </form>
        </div>
    );
}