import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const DashBoardPage = (props) => {
	const [chatRooms, setChatRooms] = React.useState([]);
	const getChatRooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("CC_token"),
        },
      })
      .then((res) => {
        setChatRooms(res.data.items);
      })
      .catch((err) => {
        setTimeout(getChatRooms, 3000);
      });
  };

	React.useEffect(() => {
    getChatRooms();
    // eslint-disable-next-line
  }, []);
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
        {chatRooms.map((chatroom) => (
          <div key={chatroom._id} className="chatRoom">
            <div>{chatroom.name}</div>
            <Link to={"/chatroom/" + chatroom._id}>
              <div className="join">Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DashBoardPage;