import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import ScanQRCode from './components/profesor/ScanQRCode';
import APIPrueba from './components/api-prueba/APIPrueba';
import Administrador from './components/administrador/Administrador';
import DirectorDepartamento from './components/director-departamento/DirectorDepartamento';
import Vicerrector from './components/vicerrector/Vicerrector';
import Rector from './components/rector/Rector';
import ConfirmQR from './components/profesor/ConfirmQR';
import ReporteProfesor from './components/profesor/reportes/ReporteProfesor';
import ReporteClases from './components/profesor/reportes/ReporteClases';

function App() {
	return (
		<>
			<Routes>
				{ /* LOGIN */}
				<Route path="/" element={<LoginForm />} />

				{ /* PROFESSOR ROUTES */}
				<Route path="/profesor/qr" element={<ScanQRCode />} />
				<Route path="/profesor/reporte" element={<ReporteProfesor />} />
				<Route path="/profesor/reporte/clase" element={<ReporteClases />} />
				<Route path="/profesor/qr/:nomina/:type/:token" element={<ConfirmQR />} />

				{ /* ADMIN ROUTES */}
				<Route path="/administrador" element={<Administrador />} />

				{ /* DEPARTMENT DIRECTOR ROUTES */}
				<Route path="/director-departamento" element={<DirectorDepartamento />} />

				{ /* VICE-RECTOR ROUTES */}
				<Route path="/vicerrector" element={<Vicerrector />} />

				{ /* RECTOR ROUTES */ }
				<Route path="/rector" element={<Rector />} />
				
				{ /* ROUTES FOR TESTING PURPOSES */ }
				<Route path="/api" element={<APIPrueba />} />
			</Routes>
		</>
	);
}

export default App;