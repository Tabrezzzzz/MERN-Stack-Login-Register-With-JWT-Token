import React, { useState } from "react";
import { Register } from "./Register";
import { Login } from "./Login";

export const Form = () => {
	const [registerModal, setRegisterModal] = useState(false);
	return (
		<div className="form-section">
			<div>
				<h1>MERN Stack Form with Upload Image</h1>
				<div class="form-container">
					<div className="form-buttons">
						<button
							className={registerModal ? "" : "active"}
							onClick={() => setRegisterModal(true)}
						>
							Register
						</button>
						<button
							className={registerModal ? "active" : ""}
							onClick={() => setRegisterModal(false)}
						>
							Login
						</button>
					</div>
					{registerModal ? <Register /> : <Login />}
				</div>
			</div>
		</div>
	);
};
