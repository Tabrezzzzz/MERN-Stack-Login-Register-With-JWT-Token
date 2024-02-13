import React, { useState } from "react";
import { Register } from "./Register";
import { Login } from "./Login";
import { ForgotPassword } from "./ForgotPassword";

export const Form = () => {
	const [registerModal, setRegisterModal] = useState(false);
	const [forgotPassword, setForgotPassword] = useState(false);
	return (
		<div className="form-section">
			<div>
				{forgotPassword ? (
					<ForgotPassword setForgotPassword={setForgotPassword} />
				) : (
					<>
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
							{registerModal ? (
								<Register />
							) : (
								<Login setForgotPassword={setForgotPassword} />
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};
