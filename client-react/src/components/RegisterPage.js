import React from 'react';
import makeToast from "../Toaster";
import api from '../utils/config';

const registerPage = (props) => {
	const nameRef = React.createRef();
	const emailRef = React.createRef();
	const passwordRef = React.createRef();

	const registerUser = () => {
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		api.post(`/user/register`, {
			name,
			email, 
			password 
		})
		.then((res) => {
			makeToast('success', res.data.message);
			props.history.push("/login");
		})
		.catch((err) => {
			if (
				err &&
				err.response &&
				err.response.data &&
				err.response.data.message
			)
				makeToast("error", err.response.data.message);
		})
	}

	return (<div className="card">
		<div className="cardHeader">Register</div>
		<div className="cardBody">
			<div className="inputGroup">
				<label htmlFor="name">Name</label>
				<input
					type="text" 
					name="name" 
					id="name" 
					placeholder="Linh Nguyen Vu"
					ref={nameRef}
				/>
			</div>
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
			<button onClick={registerUser}>Register</button>
			<p className="btnDirect">
				<a href="/login"> Already have account? </a>
			</p>
		</div>
	</div>
	);
}

export default registerPage
