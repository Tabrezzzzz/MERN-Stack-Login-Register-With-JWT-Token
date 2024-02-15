import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRightToBracket, FaPenToSquare } from "react-icons/fa6";
import { Register } from "./LoginRegister/Register";
import "../App.css";
import { UpdateProfile } from "./UpdateProfile";
import { useNavigate } from "react-router-dom";

export const Home = ({authentication}) => {
	const [currentUser, setCurrentUser] = useState();
	const [edit, setEdit] = useState(false);
	let navigate = useNavigate()


	useEffect(() => {
		const getUser = async () => {
			try {
				let token = localStorage.getItem("token");
				let response = await axios.post(
					"http://localhost:8080/api/user/verify-token",
					"",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if(response.data.message !== "Valid JWT Token"){
					navigate( "/login-register" )
				}
				setCurrentUser(response.data.authUser);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		getUser();
	}, [edit]); // Provide an empty dependency array to run the effect only once

	const userLogout = () => {
		try {
			localStorage.removeItem("token");
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="home-section">
			<div className="card-container">
				{currentUser && !edit ? (
					<>
						<div className="img-container">
							<div>
								<img
									src={`http://localhost:8080/uploads/${currentUser.profileImage}`}
									alt="Profile Picture"
								/>
							</div>
							<FaPenToSquare
								fontSize={"20px"}
								color={"#b91dd3"}
								cursor={"pointer"}
								style={{
									position:"absolute",
									right:"0"
								}}
								onClick={() => setEdit(true)}
							/>
						</div>
						<div className="user-name">
							<p className="label">Name</p>
							<h4>{currentUser.name}</h4>
						</div>
						<div className="user-data">
							<p className="label">Email</p>
							<h4>{currentUser.email}</h4>
						</div>
						<div className="user-data">
							<p className="label">Phone Number</p>
							<h4>{currentUser.phoneNumber}</h4>
						</div>
						<div className="hashed">
							<p className="label">Hashed Password</p>
							<p>{currentUser.password}</p>
						</div>
						<button className="logout" onClick={() => userLogout()}>
							Logout <FaArrowRightToBracket fontSize={"15px"} />
						</button>
					</>
				) : null}
				{currentUser && edit ? (
					<>
						<div className="form-container">
							<UpdateProfile
								setEdit={setEdit}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
							/>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};
