/* eslint-disable jsx-a11y/anchor-is-valid */
import { BiUserCircle } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const SidebarRector = (props) => {
    const { user } = props;
    const navigate = useNavigate();

    
    // --- COMPONENT (HTML) ---
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-white sidebar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <p className="d-flex align-items-center pb-5 mb-md-0 me-md-auto texto-udem text-decoration-none pt-4">
                    <BiUserCircle className="icono-usuario"></BiUserCircle>
                    <span className="p-nombre d-none d-sm-inline">{user}</span>
                </p>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <a className="nav-link align-middle px-0 pb-4 fs-5" onClick={() => { navigate("/rector") }}>
                            <i className="fs-4 bi-house"></i> <span className={`ms-1 d-none d-sm-inline active-link`}><GoGraph className="icono-sidebar"></GoGraph> Ver Reportes</span>
                        </a>
                    </li>
                </ul>
                <hr />
            </div>
        </div>
    );
};

export default SidebarRector;