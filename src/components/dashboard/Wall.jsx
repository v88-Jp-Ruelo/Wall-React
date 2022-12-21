import React, {useState, useEffect} from "react";
import "./Wall.scss";
import Empty_Icon from "../../assets/images/empty_Icon.png";

import CreateMessage from "./Modals/CreateMessage";
import Messages from "./section/Messages";
import DeleteMessageModal from "./Modals/DeleteMessageModal";
import DeleteCommentModal from "./Modals/DeleteCommentModal";

var message_id=101, comment_id=1;

export default function Wall(){
    const document_title = "Dashboard";
    const [message, setMessage] = useState({});
    
    let message_item=[];

    const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
    const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
    const [messageIdDelete, setMessageIdDelete] = useState(0);
    const [commentIdDelete, setCommentIdDelete] = useState(0);
    let message_counter = Object.keys(message).length;

    function createMessageSubmit(event){
        event.preventDefault();
        message_id+=1;
        const create_message_textarea_value = event.target[1].value;
        setMessage((message)=>({...message,[message_id]:{message_text: create_message_textarea_value, comments:{}}}));
    }

    function createCommentSubmit(event,message_id){
        event.preventDefault();
        comment_id+=1;
        const comment_textarea_value = event.target[0].value;
        setMessage({...message,[message_id]:{message_text: message[message_id].message_text, comments:{...message[message_id].comments, [comment_id]:comment_textarea_value}}});
    }
    
    const showDeleteModal = (message_id, type, comment_id) => {
        if(type==="message"){
            setMessageIdDelete(message_id);
            setShowDeleteMessageModal(true);
        }
        else{
            setCommentIdDelete([message_id, comment_id]);
            setShowDeleteCommentModal(true);
        }
    }
    function handleEditMessage(message_text, message_id){
        setMessage({...message,[message_id]:{message_text:message_text, comments:{...message[message_id].comments}}});
    }
    function handleEditComment(comment_text, comment_id, message_id){
        setMessage({...message,[message_id]:{message_text: message[message_id].message_text, comments:{...message[message_id].comments, [comment_id]:comment_text}}});
    }
    function submitMessageDelete(message_id){
        delete message[message_id];
    }
    function submitCommentDelete(comment_id,message_id){
        delete message[message_id].comments[comment_id];
    }
    

    for(const item in message){
        message_item.push(<Messages message={message[item].message_text} message_id={item} key={item} onShowDeleteModal={showDeleteModal} onEditMessage={handleEditMessage} onEditComment={handleEditComment}onCreateComment={createCommentSubmit} comments={message[item].comments}/>)           
    }

    useEffect(()=>{document.title = document_title},[]);
    return(
        <section>
            <header>
                <div className="header_container">
                    <h1><a href="/dashboard">The Wall Assignment</a></h1>
                    <p className="user">Welcome, Jp Ruelo!<a href="/login">Logout</a></p>
                </div>
            </header>
            <div className="container">
                <div className="main_section">
                    <div className="create_message_container">
                        <p><span>{message_counter}</span> messages arranged by latest posted</p>
                        <CreateMessage onSubmit={createMessageSubmit}/>
                    </div>
                    <div className={`empty_message ${message_counter ? "hide": ""}`}>
                        <img src={Empty_Icon} alt="Empty Message Icon" />
                        <p>No Message Posted Yet.</p>
                    </div>
                    <ul id="message_container">
                        {message_item.splice(0).reverse()}
                    </ul>
                </div>
            </div>
            {showDeleteMessageModal ? <DeleteMessageModal close={()=>setShowDeleteMessageModal(false)} message_id={messageIdDelete} onSubmitMessageDelete={submitMessageDelete}/> : ""} 
            {showDeleteCommentModal ? <DeleteCommentModal close={()=>setShowDeleteCommentModal(false)} comment_id={commentIdDelete[1]} message_id={commentIdDelete[0]} onSubmitCommentDelete={submitCommentDelete}/> : ""} 
        </section>
    );
}