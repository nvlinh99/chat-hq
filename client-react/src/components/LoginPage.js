import React from 'react'
import axios from 'axios'
import makeToast from "../Toaster"

const loginPage = (props) => {
	const emailRef = React.createRef(); 
	const passwordRef = React.createRef();
	
	const loginUser = () => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		axios.post("http://localhost:8000/user/login", {
			email, 
			password
		})
		.then((res) => {
			makeToast("success", res.data.message);
			localStorage.setItem("CC_token", res.data.token);
			props.history.push("/dashboard");
		})
		.catch((err) => {
			if (
				err &&
				err.res &&
				err.res.data &&
				err.res.data.message
			)
				makeToast("error", err.res.data.message);
		});
	};

	return (<div className="card">
		<div className="cardHeader">Login</div>
		<div className="cardBody">
			<div className="inputGroup">
				<label htmlFor="email">Email</label>
				<input
					type="email" 
					name ="email" 
					id="email" 
					placeholder="email@example.com"
					ref={emailRef}
				/>
			</div>
			<div className="inputGroup">
				<label htmlFor="password">Password</label>
				<input
					type="password" 
					name ="password" 
					id="password" 
					placeholder="Your password"
					ref={passwordRef}
				/>
			</div>
			<button onClick={loginUser}>Login</button>
		</div>
	</div>
	);
}

export default loginPage