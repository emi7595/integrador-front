import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Vicerrector = () => {
	const navigate = useNavigate();

	// Get session storage information
	const session = JSON.parse(window.sessionStorage.getItem('session'));

	useEffect(() => {
		// If user is logged in...
		if (session) {
			// Redirect to proper role if necessary
			switch (session.idRol) {
				case 1:
					navigate("/profesor/qr"); break;
				case 2:
					navigate("/administrador"); break;
				case 3:
					navigate("/director-departamento"); break;
				case 5:
					navigate("/rector"); break;
				default: break;
			}
		}
		// If user is not logged in, redirect to login
		else {
			navigate("/");
		}
	}, []);


	// --- COMPONENT (HTML) ---
	return (
		<>
			{ /* PENDIENTE DE DESARROLLAR PARA SPRINTS POSTERIORES */ }
			<div>Vicerrector</div>
		</>
	);
};

export default Vicerrector;