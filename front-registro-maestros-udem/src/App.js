import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import ScanQRCode from './components/profesor/ScanQRCode';
import DirectorDepartamento from './components/director-departamento/DirectorDepartamento';
import Vicerrector from './components/vicerrector/reportes/Vicerrector';
import Decano from './components/decano/Decano.js';
import ReporteRector from './components/rector/reportes/ReporteRector';
import ConfirmQR from './components/profesor/ConfirmQR';
import ReporteProfesor from './components/profesor/reportes/ReporteProfesor';
import ReporteClases from './components/profesor/reportes/ReporteClases';
import DirectorDepartamentoReporteProfesor from './components/director-departamento/reportes/DirectorDepartamentoReporteProfesor';
import DirectorDepartamentoReporteProfesorClase from './components/director-departamento/reportes/DirectorDepartamentoReporteProfesorClase';
import VicerrectorReporteDepartamento from './components/vicerrector/reportes/VicerrectorReporteDepartamento';
import VicerrectorReporteDepartamentoProfesor from './components/vicerrector/reportes/VicerrectorReporteDepartamentoProfesor';
import VicerrectorReporteDepartamentoProfesorClase from './components/vicerrector/reportes/VicerrectorReporteDepartamentoProfesorClase';
import ReporteRectorEscuela from './components/rector/reportes/ReporteRectorEscuela';
import ReporteRectorDepartamento from './components/rector/reportes/ReporteRectorDepartamento';
import ReporteRectorProfesor from './components/rector/reportes/ReporteRectorProfesor';
import ReporteRectorClase from './components/rector/reportes/ReporteRectorClase';
import ReportarFaltasJustificadasProfesor from './components/profesor/faltasJustificadas/ReportarFaltasJustificadasProfesor2';
import ReporteAdministrador from './components/administrador/reportes/ReporteAdministrador';
import ReporteAdministradorEscuela from './components/administrador/reportes/ReporteAdministradorEscuela';
import ReporteAdministradorDepartamento from './components/administrador/reportes/ReporteAdministradorDepartamento';
import ReporteAdministradorProfesor from './components/administrador/reportes/ReporteAdministradorProfesor';
import ReporteAdministradorClase from './components/administrador/reportes/ReporteAdministradorClase';
import VerProfesoresAdministrador from './components/administrador/profesores/VerProfesoresAdministrador';
import FaltasJustificadasAdministrador from './components/administrador/faltas-justificadas/FaltasJustificadasAdministrador';
import FaltasJustificadasAceptadasAdministrador from './components/administrador/faltas-justificadas/FaltasJustificadasAceptadasAdministrador';
import FaltasJustificadasPendientesAdministrador from './components/administrador/faltas-justificadas/FaltasJustificadasPendientesAdministrador';
import ReporteRectorVicerrectoria from './components/rector/reportes/ReporteRectorVicerrectoria';
import DecanoReporteDepartamento from './components/decano/reportes/DecanoReporteDepartamento';
import DecanoReporteDepartamentoProfesor from './components/decano/reportes/DecanoReporteDepartamentoProfesor';
import DecanoReporteDepartamentoProfesorClase from './components/decano/reportes/DecanoReporteDepartamentoProfesorClase';
import VicerrectorEscuela from './components/vicerrector/VicerrectorEscuela';
import ReporteAdministradorVicerrectoria from './components/administrador/reportes/ReporteAdminsitradorVicerrectoria';

function App() {
	return (
		<>
			<Routes>
				{ /* LOGIN */}
				<Route path="/" element={<LoginForm />} />

				{ /* PROFESSOR ROUTES */}
				<Route path="/profesor" element={<ScanQRCode />} />
				<Route path="/profesor/qr" element={<ScanQRCode />} />
				<Route path="/profesor/reporte" element={<ReporteProfesor />} />
				<Route path="/profesor/reporte/clase" element={<ReporteClases />} />
				<Route path="/profesor/qr/:nomina/:type/:token" element={<ConfirmQR />} />
				<Route path="/profesor/faltas-justificadas" element={<ReportarFaltasJustificadasProfesor />} />

				{ /* ADMIN ROUTES */}
				<Route path="/administrador" element={<ReporteAdministrador />} />
				<Route path="/administrador/reporte/vicerrectoria" element={<ReporteAdministradorVicerrectoria />} />
				<Route path="/administrador/reporte/escuela" element={<ReporteAdministradorEscuela />} />
				<Route path="/administrador/reporte/escuela/departamento" element={<ReporteAdministradorDepartamento />} />
				<Route path="/administrador/reporte/escuela/departamento/profesor" element={<ReporteAdministradorProfesor />} />
				<Route path="/administrador/reporte/escuela/departamento/profesor/clase" element={<ReporteAdministradorClase />} />
				<Route path="/administrador/ver-profesores" element={<VerProfesoresAdministrador />} />
				<Route path="/administrador/faltas-justificadas" element={<FaltasJustificadasAdministrador />} />
				<Route path="/administrador/faltas-justificadas/aceptadas" element={<FaltasJustificadasAceptadasAdministrador />} />
				<Route path="/administrador/faltas-justificadas/pendientes" element={<FaltasJustificadasPendientesAdministrador />} />

				{ /* DEPARTMENT DIRECTOR ROUTES */}
				<Route path="/director-departamento" element={<DirectorDepartamento />} />
				<Route path="/director-departamento/reporte-profesor" element={<DirectorDepartamentoReporteProfesor />} />
				<Route path="/director-departamento/reporte-profesor/reporte-clase" element={<DirectorDepartamentoReporteProfesorClase />} />

				{ /* VICE-RECTOR ROUTES */}
				<Route path="/vicerrector" element={<Vicerrector />} />
				<Route path="/vicerrector/escuela" element={<VicerrectorEscuela />} />
				<Route path="/vicerrector/reporte-departamento" element={<VicerrectorReporteDepartamento />} />
				<Route path="/vicerrector/reporte-departamento/reporte-profesor" element={<VicerrectorReporteDepartamentoProfesor />} />
				<Route path="/vicerrector/reporte-departamento/reporte-profesor/reporte-clase" element={<VicerrectorReporteDepartamentoProfesorClase />} />

				{ /* DECANO ROUTES */}
				<Route path="/decano" element={<Decano />} />
				<Route path="/decano/reporte-departamento" element={<DecanoReporteDepartamento />} />
				<Route path="/decano/reporte-departamento/reporte-profesor" element={<DecanoReporteDepartamentoProfesor />} />
				<Route path="/decano/reporte-departamento/reporte-profesor/reporte-clase" element={<DecanoReporteDepartamentoProfesorClase />} />

				{ /* RECTOR ROUTES */ }
				<Route path="/rector" element={<ReporteRector />} />
				<Route path="/rector/reporte/vicerrectoria" element={<ReporteRectorVicerrectoria />} />
				<Route path="/rector/reporte/escuela" element={<ReporteRectorEscuela />} />
				<Route path="/rector/reporte/escuela/departamento" element={<ReporteRectorDepartamento />} />
				<Route path="/rector/reporte/escuela/departamento/profesor" element={<ReporteRectorProfesor />} />
				<Route path="/rector/reporte/escuela/departamento/profesor/clase" element={<ReporteRectorClase />} />
				
			</Routes>
		</>
	);
}

export default App;