/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { AES, enc } from 'crypto-js';

const ConfirmQR = () => {
	// Params of route
	let { nomina, type, token } = useParams();

	// --- FUNCTION THAT REGISTERS THE ATTENDANCE IN THE DATABASE ---
	const registerAttendance = async () => {
		try {
			// POST data
			var jsonData = {
				"nomina": nomina
			}

			// Type of attendance (entrance / departure)
			let typeStr = type === "1" ? "RegisterEntrance" : "RegisterDeparture";

			// Post request to database
			const response = await fetch('http://172.32.138.118:5096/QR/' + typeStr, {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(jsonData)
			});

			// There was an error while registering the attendance
			if (!response.ok) {
				throw new Error('Algo salió mal.');
			}
			// Attendance was registered correctly
			else {
				const data = await response.json();
				// If codes are -1, -2 or -3, the attendance was not registered. Else, the attendance was registered
				data.code === -1 || data.code === -2 || data.code === -3 ? document.getElementById("icon-ok").style.display = "none" : document.getElementById("icon-no").style.display = "none";
				// Display corresponding message of attendance
				document.getElementById("title").innerHTML = (data.code === -1 ? "Asistencia ya registrada" : data.code === -2 || data.code === -3 ? "Asistencia no registrada" : "Asistencia Registrada");
				document.getElementById("content").innerHTML = "Estado: " + (data.message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		// Decript token and compare it to current date
		let decrypted = new Date(AES.decrypt(token.replaceAll('slash', '/'), "secret_key").toString(enc.Utf8));
		let today = new Date();
		// If both match, then the QR code is correct and attendance can be registered
		if (today.getFullYear() === decrypted.getFullYear() && today.getMonth() === decrypted.getMonth() && today.getDate() === decrypted.getDate()) {
			registerAttendance();
		}
		// Else, the QR code is not valid and must be generated again
		else {
			document.getElementById("icon-ok").style.display = "none";
			document.getElementById("title").innerHTML = "Código no válido";
			document.getElementById("content").innerHTML = "Por favor, genere nuevamente el código QR";
		}

	}, []);

	
	// --- COMPONENT (HTML) ---
	return (
		<>
			<div className="vh-100 d-flex justify-content-center align-items-center">
				<div className="text-center">
					<FontAwesomeIcon id="icon-ok" icon={faCheckCircle} color="green" size="8x" />
					<FontAwesomeIcon id="icon-no" icon={faSquareXmark} color="red" size="8x" />
					<h1 id="title" className="mt-4"></h1>
					<h5 id="content"></h5>
				</div>
			</div>
		</>
	);
};

export default ConfirmQR;