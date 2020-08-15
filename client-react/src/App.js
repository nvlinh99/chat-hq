import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashBoardPage from './components/DashBoardPage';

function App() {
  return <BrowserRouter>
		<Switch>
			<Route path="/login" component={LoginPage}/>
			<Route path="/register" component={RegisterPage}/>
			<Route path="/dashboard" component={DashBoardPage}/>
		</Switch>
	</BrowserRouter>
}

export default App;
