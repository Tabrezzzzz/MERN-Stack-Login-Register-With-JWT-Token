import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Delete = ({ currentUser }) => {
	const [deletePopup, setDeletePop] = useState(false);
  const navigate = useNavigate()
	const deleteAccount = async () => {
		let confirmation = window.confirm("Want to delete?");
		if (confirmation) {
			let response = await axios.delete(
				`http://localhost:8080/api/user/delete-account/${currentUser._id}`,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			navigate("/login-register")
		} else {
		}
	};
	return (
		<div>
			<button className="delete-account" onClick={deleteAccount}>
				Delete My Account
			</button>
		</div>
	);
};
