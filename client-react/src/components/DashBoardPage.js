import React from 'react'

export default function DashBoardPage() {
	return (
    <div className="card">
      <div className="cardHeader">Chat rooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="Chat HQ Room"
          />
        </div>
      </div>
      <button>Create chat room</button>
      <div className="chatRooms">
        <div className="chatRoom">
          <div>PHP Room</div>
          <div className="join">Join</div>
        </div>
        <div className="chatRoom">
          <div>NodeJs Room</div>
          <div className="join">Join</div>
        </div>
        <div className="chatRoom">
          <div>Java Room</div>
          <div className="join">Join</div>
        </div>
      </div>
    </div>
  );
}
