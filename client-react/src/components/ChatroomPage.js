import React from 'react'
import io from "socket.io-client";

const ChatroomPage = ({ match }) => {
	const chatRoomId = match.params.id;
	const socket = io("http://localhost:8000", { 
		query: {
			token: localStorage.getItem("CC_token"),
		},
	});	
	return (
		<div>
			Chatroom Page
		</div>
	);
};

export default ChatroomPage
