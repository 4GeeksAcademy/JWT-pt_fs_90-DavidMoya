import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const sign_up = async () => {
		const response = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		if (response.ok) {
			alert("¡Registro exitoso. Inicia sesión!");
			navigate("/login")
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		sign_up();
	}

	return (
		<div className="container py-3 mt-4">
			<div className="row justify-content-center">
				<div className="card-login col-md-6 col-sm-8">
					<div className="cardshadow card">
						<div className="card-body bg-black">
							<h3 className="card-title1 text-center mb-4 text-white">Registrarse</h3>
							<form onSubmit={handleSubmit}>
								<div className="label mb-4">
									<label htmlFor="inputEmail3" className="form-label text-white">Email</label>
									<input type="email"
										className="form-control"
										id="inputEmail3"
										value={email}
										onChange={(e) => setEmail(e.target.value)} required />
								</div>
								<div className="label mb-4">
									<label htmlFor="inputPassword3" className="form-label text-white">Contraseña</label>
									<input type="password"
										className="form-control"
										id="inputPassword3"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required />
								</div>
								<div className="label mb-4">
									<label htmlFor="confirmPassword" className="form-label text-white">Confirmar Contraseña</label>
									<input type="password"
										className="form-control"
										id="confirmPassword"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required />
								</div>
								<button type="submit" className="btn btn-danger w-100">
									Registrarse
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
