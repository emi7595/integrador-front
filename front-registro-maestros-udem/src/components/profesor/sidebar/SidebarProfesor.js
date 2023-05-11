import { useEffect, useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { GoReport, GoGraph } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const SidebarProfesor = (props) => {
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
                        <a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/profesor/qr") }}>
                            <i className="fs-4 bi-house"></i> <span className={`ms-1 d-none d-sm-inline ${currentPath === '/profesor/qr' || currentPath === '/profesor' ? 'active-link' : ''}`}><BsQrCode className="icono-sidebar"></BsQrCode> Registrar asistencia</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/profesor/reporte") }}>
                            <i className="fs-4 bi-house"></i> <span className={`ms-1 d-none d-sm-inline ${currentPath === '/profesor/reporte' || currentPath === '/profesor/reporte/clase' ? 'active-link' : ''}`}><GoGraph className="icono-sidebar"></GoGraph> Ver reportes</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link align-middle px-0 fs-5" onClick={() => { navigate("/profesor/faltas-justificadas") }}>
                            <i className="fs-4 bi-house"></i> <span className={`ms-1 d-none d-sm-inline ${currentPath === '/profesor/faltas-justificadas' ? 'active-link' : ''}`}><GoReport className="icono-sidebar"></GoReport> Reportar faltas justificadas</span>
                        </a>
                    </li>
                </ul>
                <hr />
            </div>
        </div>
    );
};

export default SidebarProfesor;