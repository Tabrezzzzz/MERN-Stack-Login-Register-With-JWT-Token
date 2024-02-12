import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { FileUploader } from "react-drag-drop-files";
import {
	FaUser,
	FaEnvelope,
	FaMobileButton,
	FaRegEye,
	FaRegEyeSlash,
	FaLock,
} from "react-icons/fa6";

export const Register = () => {
	const [regResponse, setregResponse] = useState("");
	const [filename, setFileName] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
	const registerSchema = Yup.object().shape({
		name: Yup.string().min(3).required(),
		email: Yup.string().email().required(),
		phoneNumber: Yup.number()
			.typeError("That doesn't look like a phone number")
			.positive("A phone number can't start with a minus")
			.integer("A phone number can't include a decimal point")
			.min(8)
			.required("A phone number is required"),
		password: Yup.string().required(),
		profileImage: Yup.mixed()
			.required("Your Profile Pic is Required")
			.test(
				"Fichier taille",
				"upload smaller file",

				(value) => {
					return !value || (value && value.size <= 5000000);
				}
			)
			.test(
				"format",
				"upload Supported Format jpg | jpeg | png",
				(value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
			),
	});
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			phoneNumber: "",
			password: "",
			profileImage: "",
		},
		validationSchema: registerSchema,
		validateOnChange: false, // this one
		onSubmit: async (values) => {
			try {
				const response = await axios.post(
					"http://localhost:8080/api/user/register",
					values,
					{
						headers: { "Content-Type": "multipart/form-data" },
					}
				);
				setregResponse(response.data.data.message);
			} catch (error) {
				setregResponse(error.response.data);
			}
		},
	});
	let imageUpload = useRef();
	return (
		<div>
			<h4></h4>
			<form onSubmit={formik.handleSubmit} encType="multipart/form-data">
				<div style={{ position: "relative" }}>
					<label> Name </label>
					<input
						type="text"
						name="name"
						onChange={formik.handleChange}
						value={formik.values.name}
						style={{ background: "none" }}
					/>
					<span className="input-icon">
						<FaUser color="#b619d9" />
					</span>
					<p className={formik.errors.name ? "error-message" : ""}>
						{formik.errors.name ? formik.errors.name : ""}
					</p>
				</div>
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
					<label> Phone Number</label>
					<input
						type="tel"
						name="phoneNumber"
						onChange={formik.handleChange}
						value={formik.values.phoneNumber}
					/>
					<span className="input-icon">
						<FaMobileButton color="#b619d9" />
					</span>
					<p className={formik.errors.phoneNumber ? "error-message" : ""}>
						{formik.errors.phoneNumber ? formik.errors.phoneNumber : ""}
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
							/>
						) : (
							<FaRegEye
								color="#b619d9"
								onClick={(e) => setShowPassword(true)}
							/>
						)}
					</span>
					<span className="input-icon">
					<FaLock color="#b619d9"/>
					</span>
					<p className={formik.errors.password ? "error-message" : ""}>
						{formik.errors.password ? formik.errors.password : ""}
					</p>
				</div>
				<div style={{ marginBottom: "10px" }}>
					<label>Profile Image</label>
					<input
						type="file"
						name="profileImage"
						accept="image/*"
						onChange={(e) =>
							formik.setFieldValue("profileImage", e.currentTarget.files[0])
						}
						ref={imageUpload}
						hidden={true}
					/>

					<FileUploader
						name="profileImage"
						label="Upload Your Profile Pic"
						handleChange={(e) => {
							setFileName(e.name);
							formik.setFieldValue("profileImage", e);
						}}
						dropMessageStyle={{
							backgroundImage:
								"linear-gradient( 319deg, #663dff 0%, #aa00ff 37%, #cc4499 100% )",
						}}
						children={
							<div className="Upload">
								<button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										enable-background="new 0 0 24 24"
										viewBox="0 0 24 24"
										id="upload-alt"
									>
										<path
											fill="#6563FF"
											d="M18,9h-2c-0.6,0-1,0.4-1,1s0.4,1,1,1h2c0.6,0,1,0.4,1,1v7c0,0.6-0.4,1-1,1H6c-0.6,0-1-0.4-1-1v-7c0-0.6,0.4-1,1-1h2c0.6,0,1-0.4,1-1S8.6,9,8,9H6c-1.7,0-3,1.3-3,3v7c0,1.7,1.3,3,3,3h12c1.7,0,3-1.3,3-3v-7C21,10.3,19.7,9,18,9z M9.7,6.7L11,5.4V17c0,0.6,0.4,1,1,1h0c0.6,0,1-0.4,1-1V5.4l1.3,1.3C14.5,6.9,14.7,7,15,7c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4l-3-3c0,0,0,0,0,0c-0.4-0.4-1-0.4-1.4,0l-3,3c-0.4,0.4-0.4,1,0,1.4C8.7,7.1,9.3,7.1,9.7,6.7z"
										></path>
									</svg>
									Upload Your Image
									<h5>{filename}</h5>
								</button>
								<p>
									{imageUpload.current
										? imageUpload.current.value.split("\\").slice(-1)[0]
										: ""}
								</p>
							</div>
						}
					/>
					<p
						style={{ width: "210px" }}
						className={formik.errors.profileImage ? "error-message" : ""}
					>
						{formik.errors.profileImage ? formik.errors.profileImage : ""}
					</p>
				</div>

				<button type="submit">Register</button>
				<h4
					style={{
						color: "green",
						textAlign: "center",
						fontFamily: "outfit",
						marginTop: "10px",
					}}
				>
					{regResponse}
				</h4>
			</form>
		</div>
	);
};
