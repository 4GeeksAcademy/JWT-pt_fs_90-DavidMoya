import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { actions, store } = useContext(Context);
	const navigate = useNavigate();

	const sign_in = async (e) => {
		e.preventDefault();
	
		  const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  email: email,
			  password: password,
			}),
		  });
	
		  if (!response.ok) {
			return;
		  }
	
		  const data = await response.json(); 
	
		  localStorage.setItem("token", data.access_token); 
		  actions.login(data.access_token);
		  localStorage.setItem("user_id", data.user_id)
		  navigate("/home");
	
	  };

	return (
		<div className="container py-3 mt-4">
			<div className="row justify-content-center">
				<div className="card-login col-md-6 col-sm-8">
					<div className="cardshadow card">
						<div className="card-body bg-black">
							<h3 className="card-title2 text-center mt-3 mb-5 text-white">Iniciar Sesión</h3>
							<form onSubmit={sign_in}>
								<div className="label mb-5">
									<label htmlFor="inputEmail3" className="form-label text-white">Email</label>
									<input type="email"
										className="form-control"
										id="inputEmail3"
										value={email}
										onChange={(e) => setEmail(e.target.value)} required />
								</div>
								<div className="label mb-5">
									<label htmlFor="inputPassword3" className="form-label text-white">Contraseña</label>
									<input type="password"
										className="form-control"
										id="inputPassword3"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required />
								</div>
								<button type="submit" className="btn btn-danger mt-2 mb-5 w-100">
									Inciar Sesión
								</button>
								<Link to="/register" style={{ textDecoration: 'none' }}>
									<h6 className="registrarse text-white text-center mb-3"> ¿No tienes una cuenta? Registrate</h6>
								</Link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};


