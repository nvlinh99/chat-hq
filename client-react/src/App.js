import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashBoardPage from './components/DashBoardPage';
import IndexPage from './components/IndexPage';
import ChatroomPage from './components/ChatroomPage';
import io from "socket.io-client";
import makeToast from "./Toaster";
require('dotenv').config('.././.env')

function App() {
	const [socket, setSocket] = React.useState(null);

	const setupSocket = () => {
		const token = localStorage.getItem("CC_token");
		if (token && !socket) {
			const newSocket = io(process.env.REACT_APP_URL_API, {
        query: {
          token: localStorage.getItem("CC_token"),
        },
			});

			newSocket.on('disconnect', () => {
				setSocket(null);
				setTimeout(setupSocket, 3000);
        makeToast("error", "Socket disconnected!");
			});

			newSocket.on("connect", () => {
        makeToast("success", "Socket connected!");
			});

			setSocket(newSocket);
		}	
	};

	React.useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
	}, []);
	
  return <BrowserRouter>
		<Switch>
			<Route path="/" component={IndexPage} exact/>
			<Route 
				path="/login" 
				render={() => <LoginPage setupSocket={setupSocket}/>}
				exact	
			/>
			<Route path="/register" component={RegisterPage} exact/>
			<Route 
				path="/dashboard" 
				render={() => <DashBoardPage socket={socket}/>} 
				exact
			/>
			<Route 
				path="/chatroom/:id" 
				render={() => <ChatroomPage socket={socket}/>} 
				exact
			/>
		</Switch>
	</BrowserRouter>
}

export default App;
