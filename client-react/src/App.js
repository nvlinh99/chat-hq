import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashBoardPage from './components/DashBoardPage';
import IndexPage from './components/IndexPage';
import ChatroomPage from './components/ChatroomPage';

function App() {
  return <BrowserRouter>
		<Switch>
			<Route path="/" component={IndexPage} exact/>
			<Route path="/login" component={LoginPage} exact/>
			<Route path="/register" component={RegisterPage} exact/>
			<Route path="/dashboard" component={DashBoardPage} exact/>
			<Route path="/chatroom/:id" component={ChatroomPage} exact/>
		</Switch>
	</BrowserRouter>
}

export default App;
