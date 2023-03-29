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
import DirectorDepartamentoReporteProfesor from './components/director-departamento/reportes/DirectorDepartamentoReporteProfesor';
import DirectorDepartamentoReporteProfesorClase from './components/director-departamento/reportes/DirectorDepartamentoReporteProfesorClase';
import VicerrectorReporteDepartamento from './components/vicerrector/reportes/VicerrectorReporteDepartamento';
import VicerrectorReporteDepartamentoProfesor from './components/vicerrector/reportes/VicerrectorReporteDepartamentoProfesor';
import VicerrectorReporteDepartamentoProfesorClase from './components/vicerrector/reportes/VicerrectorReporteDepartamentoProfesorClase';
import RectorReporteEscuela from './components/rector/reportes/RectorReporteEscuela';
import RectorReporteEscuelaDepartamento from './components/rector/reportes/RectorReporteEscuelaDepartamento';
import RectorReporteEscuelaDepartamentoProfesor from './components/rector/reportes/RectorReporteEscuelaDepartamentoProfesor';
import RectorReporteEscuelaDepartamentoProfesorClase from './components/rector/reportes/RectorReporteEscuelaDepartamentoProfesorClase';

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
				<Route path="/director-departamento/reporte-profesor" element={<DirectorDepartamentoReporteProfesor />} />
				<Route path="/director-departamento/reporte-profesor/reporte-clase" element={<DirectorDepartamentoReporteProfesorClase />} />

				{ /* VICE-RECTOR ROUTES */}
				<Route path="/vicerrector" element={<Vicerrector />} />
				<Route path="/vicerrector/reporte-departamento" element={<VicerrectorReporteDepartamento />} />
				<Route path="/vicerrector/reporte-departamento/reporte-profesor" element={<VicerrectorReporteDepartamentoProfesor />} />
				<Route path="/vicerrector/reporte-departamento/reporte-profesor/reporte-clase" element={<VicerrectorReporteDepartamentoProfesorClase />} />

				{ /* RECTOR ROUTES */ }
				<Route path="/rector" element={<Rector />} />
				<Route path="/rector/reporte-escuela" element={<RectorReporteEscuela />} />
				<Route path="/rector/reporte-escuela/reporte-departamento" element={<RectorReporteEscuelaDepartamento />} />
				<Route path="/rector/reporte-escuela/reporte-departamento/reporte-profesor" element={<RectorReporteEscuelaDepartamentoProfesor />} />
				<Route path="/rector/reporte-escuela/reporte-departamento/reporte-profesor" element={<RectorReporteEscuelaDepartamentoProfesor />} />
				<Route path="/rector/reporte-escuela/reporte-departamento/reporte-profesor/reporte-clase" element={<RectorReporteEscuelaDepartamentoProfesorClase />} />
				
				{ /* ROUTES FOR TESTING PURPOSES */ }
				<Route path="/api" element={<APIPrueba />} />
			</Routes>
		</>
	);
}

export default App;