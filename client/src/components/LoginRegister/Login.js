import React, { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import {
	FaArrowRight,
	FaArrowRightToBracket,
	FaEnvelope,
	FaLock,
	FaRegEye,
	FaRegEyeSlash,
} from "react-icons/fa6";

export const Login = ({ setForgotPassword }) => {
	const [responseMessage, setResponseMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email().required("Required"),
		password: Yup.string().required(),
	});
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: LoginSchema,
		onSubmit: async (values) => {
			// same shape as initial values
			try {
				let response = await axios.post(
					"http://localhost:8080/api/user/login",
					values,
					{
						headers: { "Content-Type": "application/json" },
					}
				);
				setResponseMessage(response.data.message);
				localStorage.removeItem("token");
				localStorage.setItem("token", response.data.token);
				if (response.data.message == "User Logged in successfully") {
					navigate("/");
				} else {
					console.log("Err");
				}
			} catch (err) {
				console.log(err);
			}
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<div style={{ position: "relative" }}>
				<label> Email</label>
				<input
					type="email"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					style={{ background: "none" }}
				/>
				<span className="input-icon">
					<FaEnvelope color="#b619d9" />
				</span>
				<p className={formik.errors.email ? "error-message" : ""}>
					{formik.errors.email ? formik.errors.email : ""}
				</p>
			</div>
			<div style={{ position: "relative" }}>
				<label> Password</label>
				<input
					type={showPassword ? "text" : "password"}
					name="password"
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<span className="password-icon">
					{showPassword ? (
						<FaRegEyeSlash
							color="#b619d9"
							onClick={(e) => setShowPassword(false)}
							cursor={"pointer"}
						/>
					) : (
						<FaRegEye
							color="#b619d9"
							onClick={(e) => setShowPassword(true)}
							cursor={"pointer"}
						/>
					)}
				</span>
				<span className="input-icon">
					<FaLock color="#b619d9" />
				</span>
				<p className={formik.errors.password ? "error-message" : ""}>
					{formik.errors.password ? formik.errors.password : ""}
				</p>
			</div>

			<button type="submit">
				Login <FaArrowRightToBracket fontSize={"15px"} />
			</button>
			<div className="forgot-password">
				<span 
				onClick={() => setForgotPassword(true)} 
				style={{cursor:"pointer", fontSize:"14px"}}
				>
					Forgot Password ?
					<FaArrowRight  style={{ margin: "0px 0px -2px 5px" }} />
				</span>
			</div>
			{responseMessage ? <>{responseMessage}</> : null}
		</form>
	);
};
