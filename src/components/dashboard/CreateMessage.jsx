
import React,{ useRef, useState, useEffect } from "react";

export default function ShowCreateMessageModal(props){
    const [disabled, setDisabled] = useState(true);
    const post_message_button = useRef(null);
    const create_message_textarea = useRef(null);
    const [show, setShow] = useState(false);

    function closeModal(){
        setShow(false);
        setDisabled(true);
    }
    function openModal(){
        create_message_textarea.current.value="";
        post_message_button.current.disabled = true;
        setShow(true);
    }
    function checkTextAreaIfEmpty(event){
        event.preventDefault();
        if(event.target.value.length>0){
            setDisabled(false);
            post_message_button.current.disabled = false;
            
        }
        else{
            post_message_button.current.disabled = true;
            setDisabled(true);
        }
    }

    useEffect(()=>{
        post_message_button.current.disabled=true;
    })

    return(
        <>
            <button type="button" id="create_message_button" onClick={openModal}>Create Message</button>
            <div className={`create_message_modal ${show ? "" : "hide"}`}>
                <form method="POST" className="modal_board" onSubmit={(event)=>{props.onSubmit(event); closeModal()}}>
                    <button type="button" className="close_modal_button" onClick={closeModal}><span></span></button>
                    <h2>Create a Message</h2>
                    <textarea ref={create_message_textarea} className="create_message_textarea" placeholder="Type your message here." onKeyUp={checkTextAreaIfEmpty}></textarea>
                    <div className="modal_buttons">
                        <button type="button" onClick={closeModal}>Cancel</button>
                        <button type="submit" className={`${disabled ? "disabled" : ""}`} ref={post_message_button}>Post Message</button>
                    </div>
                </form>
            </div>
        </>
        
    );
}