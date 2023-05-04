/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GoGraph, GoReport } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const SidebarAdministrador = (props) => {
    const {user} = props;
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const navigate = useNavigate();
    useEffect(() => {
        const handleRouteChange = () => {
        setCurrentPath(window.location.pathname);
        };
        window.addEventListener("popstate", handleRouteChange);
        return () => {
        window.removeEventListener("popstate", handleRouteChange);
        };
    }, []);
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white sidebar">
			<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
				<p className="d-flex align-items-center pb-5 mb-md-0 me-md-auto texto-udem text-decoration-none pt-4">
					<BiUserCircle className="icono-usuario"></BiUserCircle>
					<span className="p-nombre d-none d-sm-inline">{user}</span>
				</p>
				<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
					<li className="nav-item">
						<a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/administrador") }}>
						    <i className="fs-4 bi-house"></i> <span className={`ms-1 d-none d-sm-inline ${currentPath === '/administrador' || currentPath === '/administrador/' || currentPath === '/administrador/reporte/escuela' || currentPath === '/administrador/reporte/escuela/departamento' || currentPath === '/administrador/reporte/escuela/departamento/profesor' || currentPath === '/administrador/reporte/escuela/departamento/profesor/clase' ? 'active-link' : ''}`}><GoGraph className="icono-sidebar"></GoGraph> Ver Reportes</span>
						</a>
					</li>
                    <li className="nav-item">
						<a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/administrador/ver-profesores") }}>
						    <i className="fs-4 bi-house"></i> <span className={`ms-1 d-none d-sm-inline ${currentPath === '/administrador/ver-profesores' ? 'active-link' : ''}`}><FaChalkboardTeacher className="icono-sidebar"></FaChalkboardTeacher> Ver Profesores</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link align-middle px-0 fs-5" onClick={() => { navigate("/administrador/faltas-justificadas") }}>
						    <i className="fs-4 bi-house"></i> <span className={`ms-1 d-none d-sm-inline ${currentPath === '/administrador/faltas-justificadas' || currentPath === '/administrador/faltas-justificadas/aceptadas' || currentPath === '/administrador/faltas-justificadas/pendientes' ? 'active-link' : ''}`}><GoReport className="icono-sidebar"></GoReport> Administrar Faltas Justificadas</span>
						</a>
					</li>
				</ul>
				<hr/>
		    </div>
        </div>
    );
};

export default SidebarAdministrador;