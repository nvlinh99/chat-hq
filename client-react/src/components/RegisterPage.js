import React from 'react'

const registerPage = () => {
	return (<div className="card">
		<div className="cardHeader">Register</div>
		<div className="cardBody">
			<div className="inputGroup">
				<label htmlFor="name">Name</label>
				<input
					type="text" 
					name ="name" 
					id="name" 
					placeholder="Linh Nguyen Vu"
				/>
			</div>
			<div className="inputGroup">
				<label htmlFor="email">Email</label>
				<input
					type="email" 
					name ="email" 
					id="email" 
					placeholder="email@example.com"
				/>
			</div>
			<div className="inputGroup">
				<label htmlFor="password">Password</label>
				<input
					type="password" 
					name ="password" 
					id="password" 
					placeholder="Your password"
				/>
			</div>
			<button>Register</button>
		</div>
	</div>
	);
}

export default registerPage
