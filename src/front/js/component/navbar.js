import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [isLogged, setIsLogged] = useState(!!store.token);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLogged(!!store.token);
	}, [store.token])

	const logoutUser = () => {
		actions.logout();
		navigate("/login");
	};
	return (
		<nav className="navbar navbar-light bg-secondary">
			<div className="container">
				<span className="navbar-brand mb-0 fs-3"><strong>JWT con Flask y React</strong></span>
				{
					isLogged ?
						<div className="ml-auto d-flex">
							<button className="btn btn-primary" onClick={() => {
								logoutUser();
							}} >Cerrar sesión</button>
						</div>
						:
						<div className="ml-auto d-flex">
							<Link to="/register">
								<div className="btn btn-primary me-3">Registrarse</div>
							</Link>
							<Link to="/login">
								<div className="btn btn-primary">Iniciar sesión</div>
							</Link>
						</div>
				}
			</div>
		</nav>
	);
};
